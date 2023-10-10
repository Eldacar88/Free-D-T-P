const mongoose = require('mongoose');

const seasonScheme = new mongoose.Schema({
    numberofSeason:{
      type: String,
      required: true,
    },
    
    title:{
      type: String,
      required: true,
      minlegth: 3,
      maxlength: 50,
    },
  
    id: {
      type: String,
      required: true
    },
  
    finalContestDate:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    finalTrainingDate:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    startDate:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    durationSession:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    numberOfSessions:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  
    durationLastSession:{
      type: String,
      required: true,
      minlegth: 1,
      maxlength: 50,
    },
  })
  
  const Season = mongoose.model('season', seasonScheme);

  module.exports = Season;