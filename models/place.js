'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore']
  },
  timestamps: {
    type: Date,
    default: Date.now
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
});

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', schema);
