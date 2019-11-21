'use strict';

const mongoose = require('mongoose'),

const schema = new mongoose.Schema(
  {
    name: String,
    type: {
      type: String,
      enum: ['cofee shop', 'bookstore']
    },
  },
    {
      timestamps: true
});

const Place = mongoose.model('Place', schema)

module.exports = Place