'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  timestamps: String,
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
});

module.exports = mongoose.model('Place', schema);
