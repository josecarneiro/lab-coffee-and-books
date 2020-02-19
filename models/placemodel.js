'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
      //trim - white spaces will be removed from both sides of the string.
    },
    type: {
      type: String,
      enum: ['coffee-shop', 'bookstore']
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
    timestamp: true
  }
);

module.exports = mongoose.model('Place', schema);
