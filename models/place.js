'use strict';
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Coffee Shop', 'Bookstore'],
    },
  },
  {
    timestamps: true,
  }
);

//creating the model
const Place = mongoose.model('Place', placeSchema);

//exporting the model
module.exports = Place;
