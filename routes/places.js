'use strict';

const { Router } = require('express');
const router = Router();
const Places = require('./../models/place');

router.get('/create', (req, res, next) => {
  res.render('create');
});


// Create a Place
router.post('/create', (req, res, next) => {
  Places.create({
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
  Places.findById(req.params.id)
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
