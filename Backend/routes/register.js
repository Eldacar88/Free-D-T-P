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

router.post('/', limit, async(req,res)=>{
    const{id, firstname, lastname, email, password, role} = req.body;
    // sind alle Felder ausgefüllt
    if(!id || !firstname || !lastname || !email || !password || !role){
        return res.status(404).send({message: "Please fill out all fields."});
    }
    // existiert der Nutzer
    const existsUser = await FreeDTPUser.findOne({email});

    if(existsUser){
        return res.status(409).send({message: "User already exists."});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new FreeDTPUser({id, firstname, lastname, email, password: hashedPassword, role});

    try{
        await FreeDTPUser.create(user);
        res.status(201).send({message: "User succesfully created."});
    }
    catch(error){
        res.status(500).send({message: "Something went wrong"});
    }
})

module.exports = router;