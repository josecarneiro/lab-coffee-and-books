'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');
/*
router.get('/list', (req, res, next) => {
  const { latitude, longitude, distance } = req.query;

  Restaurant.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [Number(longitude), Number(latitude)]
        },
        $maxDistance: 1000 * Number(distance)
      }
    }
  })
    .then(restaurants => {
      res.render('restaurant/list', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});
*/
router.get('/create', (req, res, next) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, time } = req.body;

  Place.create({
    name,
    type,
    time
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:placeId', (req, res, next) => {
  const { placeId } = req.params;

  Place.findById(placeId)
    .then(place => {
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
