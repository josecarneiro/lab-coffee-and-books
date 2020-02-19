'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

const Places = require('../models/placemodel');

//Create

//get
router.get('/create', (req, res, next) => {
  res.render('./create');
});
//post
router.post('/create', (req, res, next) => {
  const { name, latitude, longitude, type } = req.body;

  Places.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(info => {
      console.log(info);
      res.redirect(`/single/${info._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/single/:id', (req, res, next) => {
  console.log('Iam at single page', req.params.id);
  const id = req.params.id;

  Places.findById(id)
    .then(info => {
      console.log('found item', info);
      res.render('single', { info });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
