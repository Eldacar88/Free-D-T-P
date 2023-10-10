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

const Season = require('../models/seasonModel');

router.post('/', async(req,res) => {
    const {title, id, finalContestDate, finalTrainingDate, startDate, durationSession, numberOfSessions, durationLastSession } = req.body;
  
    if(!title ||!id || !finalContestDate || !finalTrainingDate || !startDate || !durationSession || !numberOfSessions || !durationLastSession){
      return res.status(404).send({message: "Please fill out all fields."});
    }
  
    const season = new Season({title, id, finalContestDate, finalTrainingDate, startDate,
                                         durationSession, numberOfSessions, durationLastSession});
    
    try{
        await Season.create(season);
        res.status(201).send({message: "Event succesfully created."});
    }
    catch(error){
      res.status(500).send({message: "Something went wrong"});
    }                                    
  })

  module.exports = router;