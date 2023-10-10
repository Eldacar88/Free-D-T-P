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

router.put('/', async(req, res) => {
    const {title, day} = req.query;
    const eventDataToUpdate = req.body;  
  
    try{
      const updatedEvent = await Event.findOneAndUpdate(
        { title: title, day: day },
        eventDataToUpdate,
        {
          new: true, // Return the updated event
        }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.json(updatedEvent);
      }
    catch(error){
      res.status(500).json({message: "Server Error"});
    }
  })

  module.exports = router;
  