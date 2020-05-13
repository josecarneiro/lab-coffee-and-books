const express = require('express');
const Place = require('./../models/place');

const placeRouter = new express.Router();

//ROUTES

placeRouter.get('/create', (req, res, next) => {
  res.render('place/create');
});

module.exports = placeRouter;
