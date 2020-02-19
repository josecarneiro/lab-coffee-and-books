'use strict';

const express = require('express');
const router = express.Router();
const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(places => {
      res.render('places/list', { places });
    })
    .catch(error => {
      next(error);
    });
});

//Adding Places

router.get('/new', (req, res, next) => {
  res.render('places/new');
});

router.post('/new', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;

  const newPlace = new Place({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  });
  /*  .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    }); */

  newPlace.save(error => {
    if (error) {
      next(error);
    } else {
      res.redirect(`/places`);
    }
  });
});

//Updating

router.get('/edit/:place_id', (req, res, next) => {
  Place.findById(req.params.place_id)
    .then(place => {
      res.render('places/edit', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/edit/:place_id', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;

  Place.findByIdAndUpdate(
    req.params.place_id,
    {
      name,
      type,
      location: {
        coordinates: [latitude, longitude]
      }
    },
    { runValidators: true }
  )
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

//Deleting

router.post('/:id/delete', (req, res, next) => {
  Place.findByIdAndRemove(req.params.id)
    .then(place => {
      res.redirect('/places');
    })
    .catch(error => {
      next(error);
    });
});

//Single view

router.get('/:place_Id', (req, res, next) => {
  Place.findById(req.params.place_Id)
    .then(place => {
      res.render('places/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
