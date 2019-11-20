'use strict';

const { Router } = require('express');
const router = Router();

router.get('/create', (req, res, next) => {
  res.render('create');
});

const Place = require('./../models/place');

// Create a restaurant
router.post('/create', (req, res, next) => {
  Place.create({
    name: req.body.name,
    type: req.body.type,
    location: {
      coordinates: [
        parseFloat(req.body.longitude.replace(',', '.')),
        parseFloat(req.body.latitude.replace(',', '.'))
      ]
    }
  })
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      res.render('single', { place });
    })
    .catch(error => {
      next(error);
    });
});


router.get('/', (req, res, next) => {
  res.render('places');
});



module.exports = router;
