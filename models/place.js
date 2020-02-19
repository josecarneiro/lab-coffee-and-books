'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  timestamps: Date
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;