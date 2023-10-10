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

router.get('/', async(req, res) => {
    const title = req.query.title;
    const description = req.query.description;
    const label = req.query.label;
    const day = req.query.day;
    const id = req.query.id;
    const realId = req.query.realId;
    const existsEvent = await Event.findOne({title});
    const selectedDay = day;

  try{
    if(existsEvent.day == selectedDay){
      const eventData = await Event.findOne({title: title}).exec();
      res.json(eventData);
    } 
  }
  catch(error){
    res.status(500).send({message: "Something went wrong"});
  }
})

module.exports = router;