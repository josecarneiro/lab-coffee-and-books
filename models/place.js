'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['coffee shop', 'bookstore'],
      required: true
    },
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
  },
  {
    timestamps: true
  }
);


  
  placeSchema.index({ location: '2dsphere' });
  
  module.exports = mongoose.model('Place', placeSchema);
