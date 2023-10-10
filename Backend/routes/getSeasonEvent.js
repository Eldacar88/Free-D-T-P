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

router.get('/', async(req, res) => {
    try{
      const eventData = await SeasonEvent.find({}).exec();
      //console.log(eventData);
      res.json(eventData);
    }
    catch(error)
    {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    } 
  })

  module.exports = router;