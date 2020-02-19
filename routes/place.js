'use strict';

const { Router } = require('express');
const router = Router();
const Place = require('./../models/place');

router.get('/list', (req, res, next) => {
  Place.find()
    .then(places => {
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
  const { name, type } = req.body;

  Place.create({
    name,
    type
  })
    .then(place => {
      console.log(place);
      res.redirect('/place/list');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Place.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/place/list');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(place => {
      res.render('place/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, type } = req.body;

  Place.findByIdAndUpdate(id, { name, type })
    .then(() => {
      res.redirect('/place/list');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      console.log(place);
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
