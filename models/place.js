'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  timestamps: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Place', schema);
