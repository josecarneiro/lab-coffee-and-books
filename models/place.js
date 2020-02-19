'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    enum: ['Coffee Shop', 'Bookstore']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  lat: Number,
  lng: Number
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
