'use strict';

const { Router } = require('express');
const router = Router();

const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('places/index', { places });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      console.log(place.name + 'added' + place);
      res.redirect('/places');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Place.findById(id)
    .then(place => {
      res.render('places/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Place.findOneAndDelete(id)
    .then(() => {
      res.redirect('/places');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Place.findById(id).then(place => {
    res.render('places/edit', { place });
  });
});

router.post('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, type } = req.body;
  const data = {
    name,
    type
  };
  Place.findOneAndUpdate(id, data)
    .then(() => {
      res.redirect(`/places/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
