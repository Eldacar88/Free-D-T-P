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

const SeasonEvent = require('../models/seasonEventModel');

router.put('/', async(req, res) => {
    const {title, description, label, day, id, realId } = req.body;
    const updatedData = req.body;
    const existsEvent = await SeasonEvent.findOne({title});
    const selectedDay = day;
  
    try{
    if(existsEvent.day == selectedDay){
      await SeasonEvent.updateOne(
        {title: title},
        {$set: updatedData});
    } 
      res.status(200).send(`Event updated succesfully.`);
    }
    catch(error){
      res.status(500).send({message: "Something went wrong"});
    }
  })

  module.exports = router;