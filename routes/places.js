"use strict";

const { Router } = require("express");
const router = new Router();

// List places
router.get("/", (req, res, next) => {
  Place.find({})
    .then(places => {
      res.render("place/list", { places });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get("/create", (req, res, next) => {
  // ...
  res.render("place/create");
});

const Place = require("./../models/place");

// Create a restaurant
router.post("/create", (req, res, next) => {
  Place.create({
    name: req.body.name,
    type: req.body.type
    /* location: {
      coordinates: [
        parseFloat(req.body.longitude.replace(',', '.')),
        parseFloat(req.body.latitude.replace(',', '.'))
      ]
    } */
  })
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

////////////////

router.post("/:placeId/edit", (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findByIdAndUpdate(placeId, {
    name: req.body.name,
    type: req.body.type
  })
    .then(() => {
      res.redirect(`/places`);
    })
    .catch(error => {
      next(error);
    });
});

// Load place
router.get("/:id", (req, res, next) => {
  Place.findById(req.params.id)
    .then(place => {
      res.render("place/single", { place });
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:placeId/edit", (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findById(placeId)
    .then(place => {
      res.render("place/edit", { place });
    })
    .catch(error => {
      next(error);
    });
});
router.post("/:placeId/delete", (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findByIdAndDelete(placeId)
    .then(data => {
      console.log(data);
      res.redirect(`/places`);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
