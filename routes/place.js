'use strict';

const { Router } = require('express');
const router = Router();

const Place = require('./../models/place');

router.get('/list', (req, res, next) => {
  Place.find()
    .then(places => {
      // console.log(places);
      res.render('place/list', { places });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, timestamps, latitude, longitude } = req.body;

  Place.create({
    name,
    type,
    timestamps,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      res.redirect(`${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:placeId/delete', (req, res, next) => {
  const { placeId } = req.params;

  Place.findByIdAndDelete(placeId)
    .then(() => {
      res.redirect(`/`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:placeId/edit', (req, res, next) => {
  const { placeId } = req.params;

  Place.findById(placeId)
    .then(place => {
      res.render('place/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:placeId/edit', (req, res, next) => {
  const { placeId } = req.params;
  const { name, type, timestamps, latitude, longitude } = req.body;

  Place.findByIdAndUpdate(placeId, {
    name,
    type,
    timestamps,
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
