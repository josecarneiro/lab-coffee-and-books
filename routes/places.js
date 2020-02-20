'use strict';

const { Router } = require('express');
const router = Router();
const Place = require('../models/place');

router.get('/', (req, res, next) => {
  Place.find()
    .then(data => {
      res.render('places/index', { data });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.post('/create', (req, res, next) => {
  const data = {
    name: req.body.name,
    type: req.body.type
  };
  console.log(data);

  Place.create(data)
    .then(() => {
      res.redirect(`/places`);
    })
    .catch(() => {
      res.render('places/create');
    });
});

router.get('/:id/singleview', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(data => {
      console.log(data);
      res.render('places/singleview', { data });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/update', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(data => {
      res.render('places/update', { data });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/update', (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    type: req.body.type
  };
  console.log(data);
  Place.findByIdAndUpdate(id, data)
    .then(() => {
      res.redirect(`/places/${id}/singleview`);
    })

    .catch(error => {
      next(error);
    });
});
router.get('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/places');
    })
    .catch(error => {
      next(error);
    });
});
module.exports = router;
