'use strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['coffe-shop', 'bookstore']
  } ,
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
  {timestamps: true}
  );

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', schema);