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

router.post('/', async(req, res) =>{
    const {title, description, label, day, id, realId} = req.body;

    if(!title || !description || !label || !day || !id || !realId){
        return res.status(404).send({message: "Please fill out all fields."});
    }

    const event = new Event({title, description, label, day, id, realId});
    console.log(event);
    try{
        await Event.create(event);
        res.status(201).send({message: "Event succesfully created."});
    }
    catch(error){
        res.status(500).send({message: "Something went wrong"});
    }
})

module.exports = router;