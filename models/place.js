'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['coffeeshop', 'bookstore']
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Place', schema);
