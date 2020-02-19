'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['coffee shop', 'bookstore'],
    required: true,
    lowercase: true,
    trim: true
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
  //timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', schema);
