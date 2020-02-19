'use strict';

const mongoose = require("mongoose");

//create a router
const {
  Router
} = require("express");
const router = Router();

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ["coffee shop", "bookstore"]
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      min: -180,
      max: 180
    }]
  }
}, {
  timestamps: true
});

const Place = mongoose.model("User", placeSchema);

//CREATING THE ROUTES

router.post('/:place_id/delete', (req, res, next) => {
  const placeId = req.params.place_id;
  Place.findByIdAndDelete(placeId)
    .then(() => {
      console.log('The place was deleted');
      res.redirect('/place/list');
    })
    .catch((err) => {
      console.log('Couldnt delete place');
      next(err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("place/create");
});

router.post("/create", (req, res, next) => {
  Place.create({
      name: req.body.name,
      type: req.body.type
    })
    .then(() => {
      console.log("place added!");
      res.redirect("/place/list");
    })
    .catch(err => {
      console.log("Not possible to add place");
      next(err);
    });
});

router.get("/list", (req, res, next) => {
  Place.find()
    .then(places => {
      res.render("place/list", {
        place: places
      });
    })
    .catch(err => {
      console.log("Couldnt connect to places database");
      next(err);
    });
});

router.get("/update", (req, res, next) => {
  res.render("place/singleplace");
});



module.exports = Place;
module.exports = router;