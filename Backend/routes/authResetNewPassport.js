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

router.post("/", async(req,res) => {
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

module.exports = router;