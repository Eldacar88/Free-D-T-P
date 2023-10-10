const mongoose = require('mongoose');

const eventScheme = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlegth: 1,
        maxlength: 50,
      },

    description:{
        type: String,
        required: true,
        minlegth: 1,
        maxlength: 50,
      },

      label:{
        type: String,
        required: true,
        minlegth: 1,
        maxlength: 50,
      },

      day:{
        type: String,
        required: true,
        minlegth: 1,
        maxlength: 50,
      },
      id:{
        type: String,
        required: true,
      },

      realId:{
        type: String,
        required: true,
      },

})

const Event= mongoose.model('event', eventScheme);

module.exports = Event;