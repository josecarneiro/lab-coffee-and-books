'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/Place');

router.get('/', (req, res, next) => {
  Place.find()
    .then((places) => {
      console.log(places);
      res.render('index', { places });
    })
    .catch((error) => {
      next(error);
    });
});


router.get('/all-shops', (req, res, next) => {
  Place.find()
    .then((allPlaces) => {
      console.log(allPlaces);
      res.render('all-shops', { allPlaces });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/insert-shops', (req, res, next) => {
  res.render('create-shops');
});

router.post('/insert-shops', (req, res, next) => {
  const data = req.body;
  console.log(req.body);
  Place.create({
    name: data.name,
    type: data.type,
    location: {
      coordinates: [data.longitude, data.latitude]
    }
  })
    .then(() => {
      res.redirect('/all-shops');
    })
    .catch((error) => {
      console.log('Error in creations');
      next(error);
    });
});

// router.get('/edit/:id', (req, res, next) => {
//find the id
//move it to the edit field (prefill it)
// });

// Post router for when edit field gets submitted
// router.post()

module.exports = router;
