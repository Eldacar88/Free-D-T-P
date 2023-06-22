//Zugriff auf Variablen aus der env-Datei
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const multer = require('multer');
const bcrypt = require('bcrypt');
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


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
