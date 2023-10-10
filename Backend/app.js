//Zugriff auf Variablen aus der env-Datei
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const multer = require('multer');
const bcrypt = require('bcrypt');

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

const authResetRouter = require('./routes/authReset');
const authResetNewPassportRouter = require('./routes/authResetNewPassport');
const deleteEventRouter = require('./routes/deleteEvent');
const deleteSeasonEventRouter = require('./routes/deleteSeasonEvent');
const getEventRouter = require('./routes/getEvent');
const getSeasonRouter = require('./routes/getSeason');
const getSeasonEventRouter = require('./routes/getSeasonEvent')
const getSessionRouter = require('./routes/getSession');
const getUpdatedSeasonEventRouter = require('./routes/getUpdatedSeasonEvent');
const loginRouter = require('./routes/login');
const postEventRouter = require('./routes/postEvent');
const postSeasonRouter = require('./routes/postSeason');
const postSeasonEventRouter = require('./routes/postSeasonEvent');
const postSessionRouter = require('./routes/postSession');
const registerRouter = require('./routes/register');
const updateEventRouter = require('./routes/updateEvent');
const updateSeasonEventRouter = require('./routes/updateSeasonEvent');
const getNumberOfSeasonsRouter = require('./routes/getNumberofSeasons');

app.use(express.json());

app.use(async function (req, res, next) {
    await mongoose.connect(process.env.Connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    next();
});

app.get('/', (req, res) => {
    res.send('Basic Route of the backend')
});

//User
app.get('/getuser', async(req, res) => {
    const users = await FreeDTPUser.find({});
    res.send(users);
})

app.post('/postuser', async(req, res) => {
    await FreeDTPUser.create(user);
    res.status(200).send("Neuer User angelegt, Datenbank aktualisiert.");
})

//Events
app.use('/postEvent', postEventRouter);
app.use('/getEvent', getEventRouter);
app.use('/updateEvent', updateEventRouter);
app.use('/deleteEvent', deleteEventRouter);

//SeasonEvent
app.use('/postSeasonEvent', postSeasonEventRouter);
app.use('/getSeasonEvent', getSeasonEventRouter);
app.use('/updateSeasonEvent', updateSeasonEventRouter);
app.use('/getUpdatedSeasonEvent', getUpdatedSeasonEventRouter);
app.use('/deleteSeasonEvent', deleteSeasonEventRouter);

//Season
app.use('/postSeason', postSeasonRouter);
app.use('/getSeason', getSeasonRouter);
app.use('/getNumberOfSeasons', getNumberOfSeasonsRouter);

//Session
app.use('/postSession', postSessionRouter);
app.use('/getSession', getSessionRouter);

// Register / Login
app.use('/register', registerRouter);
app.use('/login', loginRouter);

//reset password route
app.use('/auth/reset', authResetRouter);
app.use('/auth/reset/newPassword', authResetNewPassportRouter);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});