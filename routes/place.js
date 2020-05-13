'use strict';
const express = require('express');

const Place = require('./../models/place');
const placeRouter = new express.Router();

//places list route handler
placeRouter.get('/list', (req, res, next) => {
  console.log('list of places available');
  Place.find()
    .then((places) => {
      res.render('place/list', { places });
    })
    .catch((error) => {
      next(error);
    });
});

//create place route
placeRouter.get('/create', (req, res, next) => {
  console.log('please create a place of your preference');
  res.render('place/create');
});

placeRouter.post('/create', (req, res, next) => {
  console.log('new place was created');
  console.log(req.body);
  const name = req.body.name;
  const type = req.body.type;

  Place.create({
    name,
    type,
  })
    .then((place) => {
      res.redirect('/place/list');
    })
    .catch((error) => {
      next(error);
    });
});
//get a single view
placeRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  //console.log('single view of the place');
  Place.findOne({ _id: id })
    .then((id) => {
      //console.log(placeId);
      res.render('place/single', { id });
    })
    .catch((error) => {
      next(error);
    });
});

/*
//deleting a place
placeRouter.post('/:id/delete', (req, res, next) => {
  console.log('deleting a place');
  const placeId = req.params.id;
  Place.deleteOne({ _id: placeId })
    .then(() => {
      res.redirect('/place/list');
    })
    .catch((error) => {
      next(error);
    });
});
*/

module.exports = placeRouter;
