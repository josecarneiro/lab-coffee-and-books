'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  timestamps: {
    type: String,
    default: new Date()
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [
      {
        type: mongoose.Schema.Types.Decimal128,
        min: -180,
        max: 180
      }
    ]
  }
});

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
