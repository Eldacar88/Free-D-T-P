const mongoose = require('mongoose');

const freeDTPUserScheme = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 50,
      },

    lastname: {
        type: String,
        required: true,
        minlegth: 3,
        maxlength: 50,
      },
    email: {
        type: String,
        required: true,
        minlegth: 8,
        maxlength: 50,
      },
    role: {
        type: String,
        required: true,
        minlegth: 8,
        maxlength: 50,
      },
    password: {
        type: String,
        required: true,
        minlegth: 5,
        maxlength: 255,
      },
    id: {
        type: String,
        required: true
      },
})

const FreeDTPUser = mongoose.model('freedtpuser', freeDTPUserScheme);

module.exports = FreeDTPUser;