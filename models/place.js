'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ],
    type: {
      type: String,
      default: 'Point',
      required: true
    }
  },
    typeOfPlace: {
      type: String,
      enum: ['coffee_shop', 'bookstore'],
    }
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model('Place', schema);

module.exports = Place;


