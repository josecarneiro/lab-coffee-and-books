'use strict'

const express = require('express');
const router = new express.Router();

const Places = require('../models/place');

/*
router.get('/list', (req, res) => {
  Place.find()
    .then(places => {
      const data = { places };
      res.render('list', data);
    })
    .catch(error => {
      console.log(error);
      res.send('Error');
    });
});
*/

router.get('', (req, res) => {
  res.render('index');
});


router.post('/create', (req, res, next) => {
  const data = {
    name: req.body.name,
    type: req.body.type
  };

  Places.create(data)
    .then(place => {
      const id = place._id;
      res.redirect(`/place/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Places.findByIdAndDelete(id)
    .then(place => {
      console.log('Delete place', id);
      res.redirect(`/`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Places.findById(id)
    .then(place => {
      if (!place) {
        next(new Error('NOT_FOUND'));
      } else {
        const data = { place };
        res.render('edit', data);
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    type: req.body.type
  };
  Places.findByIdAndUpdate(id, data, { runValidators: true })
    .then(() => {
      res.redirect(`/place/${id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Places.findById(id)
    .then(place => {
      if (!place) {
        next(new Error('NOT_FOUND'));
      } else {
        const data = { place };
        res.render('single', data);
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;