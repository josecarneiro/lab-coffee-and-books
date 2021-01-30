const mongoose = require('mongoose');

//schema
const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['coffee_shop', 'bookstore']
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        required: true
      },
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
    }
  },
  { timestamps: true }
);

//model
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
