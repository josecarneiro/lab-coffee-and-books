'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ["Coffee shop", "Bookstore"]
    },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  } 
},
{
   timestamp : { type: Date, default: Date.now }
  });

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Places', schema);