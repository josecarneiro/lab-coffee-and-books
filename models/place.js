'use strict';

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Coffee shop', 'Bookstore'],    
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
  timestamps: {
    type: Date,
    default: Date.now
  }
});

const Places = mongoose.model('Places', placeSchema);

module.exports = Places;