'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
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
    enum: ['coffeeshop', 'bookstore']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
