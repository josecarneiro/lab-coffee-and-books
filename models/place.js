const mongoose = require("mongoose");

//create a router
const { Router } = require("express");
const router = Router();

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ["coffee shop", "bookstore"]
    }
  },
  {
    timestamps: true
  }
);

const Place = mongoose.model("User", placeSchema);

//CREATING THE ROUTES
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
      res.redirect("/place/create");
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

router.get("/delete", (req, res, next) => {});

module.exports = Place;
module.exports = router;
