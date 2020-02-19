'use strict';

const { Router } = require('express');
const router = new Router();
const Restaurant = require('./../models/restaurant');


router.get('/create', (req, res, next) => {
  res.render('restaurant/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;

  Restaurant.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then( (restaurant) => {
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then(restaurant => {
      const data = { restaurant };
      res.render('restaurant/edit', data);
    })
    .catch(error => {
      console.log(error);
      next();
    });
});


router.post('/edit/:id', (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    type: req.body.type,
    latitude:req.body.latitude,
    longitude:req.body.longitude
  };

  Restaurant.findByIdAndUpdate( id, data , { runValidators: true })
    .then( (restaurant) => {
      res.redirect(`/restaurant/${restaurant._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/list', (req, res, next) => {
  res.render('restaurant/list');
});



router.get('/:restaurantId', (req, res, next) => {
  const { restaurantId } = req.params;

  Restaurant.findById(restaurantId)
    .then(restaurant => {
      res.render('restaurant/single', { restaurant });
    })
    .catch(error => {
      next(error);
    });
});



module.exports = router;
