'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  type: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    enum: ["coffeeshop", "bookstore"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Place', schema);