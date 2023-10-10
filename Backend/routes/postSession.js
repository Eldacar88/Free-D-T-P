require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
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

const Session = require('../models/sessionModel');

router.post('/', async(req,res) => {
    const {id, seasonTitle, sessionStartDate, sessionEndDate, sessionNumber, sessionType } = req.body;
  
    if(!id || !seasonTitle || !sessionStartDate || !sessionEndDate || !sessionNumber || !sessionType){
      return res.status(404).send({message: "Please fill out all fields."});
    }
  
    const session = new Session({id, seasonTitle, sessionStartDate, sessionEndDate, sessionNumber, sessionType});
    
    try{
        await Session.create(session);
        res.status(201).send({message: "Event succesfully created."});
    }
    catch(error){
      res.status(500).send({message: "Something went wrong"});
    }                                      
})

module.exports = router;

