'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

// CREATE PLACES GET AND POST METHOD 

router.get('/create', (req, res, next) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
    const data = req.body;
    Place.create({
      name: data.name,
      location: {
        coordinates: [data.longitude, data.latitude]
      },
      typeOfPlace: data.typeOfPlace
    })
      .then((place) => {
        res.redirect('/place/all-places');
      })
      .catch(error => {
        next(error);
      });
  }
);

// const PERIMETER_OF_EARTH_IN_METERS = 40000 * 1000;
// const PERIMETER_OF_EARTH_IN_DEGREES = 360;

// const metersToDegrees = (meters) =>
//   (meters * PERIMETER_OF_EARTH_IN_DEGREES) / PERIMETER_OF_EARTH_IN_METERS;

// DISPLAY ALL PLACES

router.get('/all-places', (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render('place/all-places', { places });
    })
    .catch(error => {
      next(error);
    });
});


// SHOW PLACE DETAILS

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
        res.render('place/place-details', { place: place });
    })
    .catch(error => {
      next(error);
    });
});

// DELETE PLACES

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndRemove(id)
    .then((place) => {
      res.redirect('/place/all-places');
    })
    .catch((error) => {
      next(error);
    });
});

// EDIT PLACES

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then((place) => {
      res.render('place/edit', { place });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  Place.findByIdAndUpdate(id, {
    name: data.name,
    type: data.type,
  })
    .then((place) => {
      res.redirect('/place/all-places');
    })
    .catch((error) => {
      next(error);
    });
});



module.exports = router;
