'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Coffee-shop', 'Bookstore']
    }
  },
  { timestamps: true }
);

/*schema.index({ location: '2dsphere' });*/

module.exports = mongoose.model('Place', schema);
