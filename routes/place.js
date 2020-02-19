'use strict';

const express = require('express');
const Place = require('./../models/place');

const router = new express.Router();

//Create
router.get('/create', (req, res) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
  Place.create({
    name: req.body.name,
    type: req.body.type
  })
    .then(place => {
      const id = place._id;
      res.redirect(`/place/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
