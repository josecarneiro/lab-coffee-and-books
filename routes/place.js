'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(place => {
      console.log(place);
      res.render('./places/show', { place });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.post('/create', (req, res, next) => {
  const { name, type } = req.body;
  Place.create({
    name,
    type
  })
    .then(place => {
      res.redirect(`/place/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/edit/:id', (req, res, next) => {
  const placeId = req.params.id;

  Place.findById(placeId)
    .then(place => {
      res.render('./places/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/edit/:id', (req, res, next) => {
  const placeId = req.params.id;
  Place.findByIdAndUpdate(placeId, {
    name: req.body.name,
    type: req.body.type
  })
    .then(updatePlace => {
      res.redirect('/place');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const placeId = req.params.id;

  Place.findById(placeId)
    .then(place => {
      res.render('./places/singleplace', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/delete/:id', (req, res, next) => {
  Place.findByIdAndRemove(req.params.id)
    .then(deletePlace => {
      res.redirect('/place');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
