const mongoose = require('mongoose');

const sessionScheme = new mongoose.Schema({
    seasonTitle:{
      type: String,
      required: true,
      minlegth: 3,
      maxlength: 50,
    },
  
    id: {
      type: String,
      required: true
    },
  
    sessionStartDate:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    sessionEndDate:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    sessionNumber:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    sessionType:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
  })
  
  const Session = mongoose.model('session', sessionScheme);

  module.exports = Session;