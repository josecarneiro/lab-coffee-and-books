'use strict';

const { Router } = require('express');
const router = Router();
const Places = require('../models/place')

router.get('/', (req, res, next) => {
  Places.find()
  .then(places => {
    console.log(places)
    res.render('./display', { places });
  })
  .catch(error => {
    console.log(error);
    next(error);
  });
});


router.get('/create', (req, res, next) => {
  res.render('create');
});

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
      console.log(place)
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  Places.findById(req.params.id)
    .then(place => {
      //console.log(place)
      res.render('./single-place', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  Places.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/places');
  })
  .catch(error => {
    console.log('Unable to delete place', error);
    next();
  })
});

router.get('/:id/update', (req, res, next) => {
  Places.findById(req.params.id)
    .then(place => {
      //console.log(place)
      res.render('./update', { place });
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;