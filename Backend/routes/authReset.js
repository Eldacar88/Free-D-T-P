require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const multer = require('multer');
const bcrypt = require('bcrypt');
const router = express.Router();

//nodemailer
const nodemailer = require("nodemailer");
//passport
const passport = require("passport");
//cookie session
const cookieSession = require("cookie-session");
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

const FreeDTPUser = require('../models/freeDTPUserModel');

router.post("/", async(req, res, next) => {
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

module.exports = router;