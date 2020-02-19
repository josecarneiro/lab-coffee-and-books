'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('../models/placemodel');

//Create

//get
router.get('/create', (req, res, next) => {
  res.render('./create');
});
//post
router.post('/create', (req, res, next) => {
  Places.create({
    name: req.body.name,
    type: req.body.type
  })
    .then(place => {
      console.log(place);
      res.redirect(`/`);
    })
    .catch(error => {
      next(error);
    });
});
//Read

//get

//post

//Update

//get

//post

//Delete

//get

//post
