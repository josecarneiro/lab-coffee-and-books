'use strict';

const { Router } = require('express');
const router = new Router();
const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/create', (req, res, next) => {
  res.render('place/create');
});

router.post('/create', (req, res, next) => {
    const data = req.body;
    Place.create({
      name: data.name,
      type: data.type,
    })
      .then(place => {
        res.redirect('/all-places');
      })
      .catch(error => {
        next(error);
      });
  }
);

router.get('/all-places', (req, res, next) => {
  res.render('place/all-places');
});

// router.get('/place/:id', (req, res, next) => {
//   const id = req.params.id;
//   Place.findById(id)
//     .then(place => {
//         res.render('place/place-details', { place: place });
//     })
//     .catch(error => {
//       next(error);
//     });
// });



module.exports = router;
