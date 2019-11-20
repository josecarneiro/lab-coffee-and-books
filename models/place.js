const mongoose = require ('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ["coffee shop", "bookstore"]
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ]
  }},
  {
    timestamps: true
  }
);

schema.index({ location: '2dsphere' });

module.exports = mongoose.model('place', schema);