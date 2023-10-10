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

const Event = require('../models/eventmodel');

router.delete('/', async(req, res) => {
    const {title, description, label, day, id, realId} = req.body;
    const existsEvent = await Event.findOne({title});
    const selectedDay = day;
  
    try{
      if(existsEvent.day == selectedDay){
        await Event.deleteOne({title: title});
      } 
      res.status(200).send(`Event deleted succesfully.`);
    }
    catch(error){
      res.status(500).send({message: "Something went wrong"});
    }
  })

  module.exports = router;