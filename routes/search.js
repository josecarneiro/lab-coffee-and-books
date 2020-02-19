'use strict';

const { Router } = require('express');
const router = Router();
const Place = require('./../models/place');

router.get('/', (req, res, next) => {
  Place.find().then(data => {
    console.log('This is Showing');
    console.log(data);
    res.render('search', { data });
  });
});

router.post('/', (req, res, next) => {
  const name = req.body.name;
  const type = req.body.type;
  const lat = req.body.latitude;
  const lng = req.body.longitude;
  console.log('This is Showing');
  console.log(req.body);
  Place.create({ name: name, type: type, lat: lat, lng: lng })
    .then(
      Place.find().then(data => {
        res.render('search', { data });
      })
    )
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const placeId = req.params.id;
  console.log('placeId');
  console.log(placeId);
  Place.findById(placeId).then(data => {
    //console.log('This is Showing');
    console.log(data);
    res.render('singleplace', { data });
  });
});

router.post('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  Place.findOneAndDelete({ _id: id })
    .then(
      // res.render('search')
      Place.find().then(data => {
        console.log('This is the id:.....................');
        res.render('search', { data });
      })
    )
    .catch(error => {
      next(error);
    });
});

module.exports = router;
