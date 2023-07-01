//Zugriff auf Variablen aus der env-Datei
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const multer = require('multer');
const bcrypt = require('bcrypt');

//nodemailer
const nodemailer = require("nodemailer");
//passport
const passport = require("passport");
//cookie session
const cookieSession = require("cookie-session");
//JSON Webtoken
//JSON Webtoken
const jwt = require('jsonwebtoken');

//express limit
const limiter = require('express-rate-limit')

const PORT = process.env.PORT
const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'))
//app.use(express.json())

const limit = limiter({
    windowMs: 15*60*1000,
    max: 100,
})

//uploading files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploads = multer({storage: storage});

const freeDTPUserScheme = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 50,
      },

    lastname: {
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 50,
      },
    email: {
        type: String,
        required: true,
        minlegth: 8,
        maxlength: 50,
      },
    password: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 255,
      },
    id: {
        type: String,
        required: true
      },
})

const FreeDTPUser = mongoose.model('freedtpuser', freeDTPUserScheme);


app.use(express.json());

app.use(async function (req, res, next) {
    await mongoose.connect(process.env.Connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Basic Route of the backend')
});

app.get('/getuser', async(req, res) => {
    const users = await FreeDTPUser.find({});
    res.send(users);
})

app.post('/postuser', async(req, res) => {
    await FreeDTPUser.create(user);
    res.status(200).send("Neuer User angelegt, Datenbank aktualisiert.");
})


app.post('/register', limit, async(req,res)=>{
    const{id, firstname, lastname, email, password} = req.body;
    // sind alle Felder ausgefüllt
    if(!id || !firstname || !lastname || !email || !password){
        return res.status(404).send({message: "Please fill out all fields."});
    }
    // existiert der Nutzer
    const existsUser = await FreeDTPUser.findOne({email});

    if(existsUser){
        return res.status(409).send({message: "User already exists."});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new FreeDTPUser({id, firstname, lastname, email, password: hashedPassword});

    try{
        await FreeDTPUser.create(user);
        res.status(201).send({message: "User succesfully created."});
    }
    catch(error){
        res.status(500).send({message: "Something went wrong"});
    }
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body;
    // check if email and password have been entered
    if(!email || !password){
        return res.status(404).send({message: "Please fill out all fields."});
    }

    //check if user exists 
    const existsUser = await FreeDTPUser.findOne({email});

    if(!existsUser){
        return res.status(401).send({message: "User does not exists."});
    }

    //check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existsUser.password);
    if(!isPasswordCorrect){
        return res.status(401).send({message: "Password is incorrect."});
    }

    //create jwt token
    const token = jwt.sign({id: existsUser._id}, process.env.JWT_SECRET);
    res.status(200).send({token,message: "Login successful"});
})

app.post("/auth/reset", async(req, res, next) => {
    //get email from body
    const {email} = req.body;
    console.log(email);
    if(!email){
        return res.status(404).send({message: "Please fill out all fields."});
    }
    //check if email exists
    try{
        const userExists = await FreeDTPUser.findOne({email: email});
        console.log(userExists);
        if(!userExists){
            res.status(401).send({message: "User does not exist"});
        }
        //create unique 6 digit code
        const code = Math.floor(100000 + Math.random()*900000);
        //send email to all possible email engines with code
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        // mail that is going to be send
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Reset Password",
            text: `Your Reset Code is ${code}`
        };
        //sending the mail
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                console.log(error);
                return res.status(500).send({message: "Internal server Error"});
            } else {
                console.log("Email sent:" + info.response);
                const token = jwt.sign({email: email}, process.env.JWT_SECRET);
                return res.status(200).send({message: "Email sent", token: token, code});
            }
        }
        )
        }
    catch(error){
        console.log(error);
        return res.status(500).send({message: "Internal server error"});
        }
    })

    //reset password route
    app.post("/auth/reset/newPassword", async(req,res) => {
        const password = req.body.password;
        const token = req.headers.authorization.split(" ")[1];
        if(!password || !token){
          res.status(404).send({message: "Unvalid input"});
        }
        try {
          console.log(`Emailtoken: ${token}`);
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          console.log(decodedToken);
          const existUser = FreeDTPUser.findOne({email: decodedToken.email});
          if(!existUser){
            return res.status(409).send({message: "User does not exist"});
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //update user password
        const user = await FreeDTPUser.findOneAndUpdate({email: decodedToken.email}, {password: hashedPassword});
        if(!user){
          return res.status(404).send({message: "User not found"});
        }
          res.status(200).send({message: "Password updated!"});
        } catch (error) {
          console.log(error);
          res.status(500).send({message: "Internal Server Error"});
        }
      
      })

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
