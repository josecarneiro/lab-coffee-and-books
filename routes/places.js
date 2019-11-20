"use strict";

const { Router } = require("express");
const router = Router();

const Place = require("./../models/place");

// router.get('/', (req, res, next) => {
//   res.render('user', { name: 'James Dean' });
// });

router.get("/", (req, res, next) => {
  res.render("place/place");
});

router.get("/addplace", (req, res, next) => {
  res.render("place/newPlace");
});

router.post("/addplace", (req, res, next) => {
  Place.create({
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
  Place.findById(req.params.id)
    .then(place => {
      res.redirect('singleplace', {place});
    })
    .catch(error => {
      next(error);
    });
});





module.exports = router;



