const { Router } = require('express');
const router = new Router();

//List places
router.get('/', (req, res, next) => 
  Place.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [-9.1, 38.3]
        },
        $minDistance: 20000,
        $maxDistance: 50000
      }
    }
  })
    .then(places => {
      res.render('place/list', { places });
    })
    .catch(error => {
      console.log(error);
      next(error);
    })
);

router.get('/create', (req, res, next) => {
  res.render('place/create');
});

const Place = require('../models/place');

//Create a place
router.post('/create', (req, res, next) => {
  Place.create({
    name: req.body.name,
    location: {
      coordinates: [
        parseFloat(req.body.longitude.replace(',', '.')),
        parseFloat(req.body.latitude.replace(',', '.'))
      ]
    }
  })
  .then(place => {
    res.redirect(`/places/$place._id}`);
  })
  .catch(error => {
    next(error);
  });
});

//Load Place
router.get('/:id', (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      res.render('place/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;