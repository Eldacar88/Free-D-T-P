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

const app = express();
app.use(cors());

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

router.post('/', async(req, res) => {
    const {role,email, password} = req.body;
    // check if email and password have been entered
    if(!email || !password || !role){
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

    //send role
    const existingRole = existsUser.role;
    const selectedRole = role;

    if(existingRole != selectedRole){
        return res.status(401).send({message: "Incorrect user-role."});
    }

    //create jwt token
    const token = jwt.sign({id: existsUser._id}, process.env.JWT_SECRET);
    res.status(200).send({selectedRole, token ,message: "Login successful"});
})

module.exports = router;