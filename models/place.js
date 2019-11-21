'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    type:{
        type: String,
        enum: ["coffee-shop", "bookstore"]
    }
    },
    {
    timestamp: true
});

module.exports = mongoose.model('Place', schema);