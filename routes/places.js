'use strict';

const { Router } = require('express');
const router = Router();

const Places = require('./../models/place')


//CRUD MODEL: CREATE, READ, UPDATE, DELETE.

//CREATE

//GET ROUTER
router.get('/create', (req,res,next) =>{
  res.render('./places/create');
});

//POST ROUTER
router.post('/create',(req,res,next)=>{
  // console.log(req.body)
  Places.create({
    name: req.body.name,
    type: req.body.type
  })
  .then((place) =>{
    console.log(place);
    res.redirect(`/places/${place._id}`);
  })
  .catch((error)=>{
    next(error);
  });
});

//READ
//ALL PLACES
router.get('/', (req, res, next) => {
  Places.find()
  .then(place =>{
    res.render('./places/list', {place});
  })
  .catch((error) =>{
    next(error);
  });
});


//UPDATE

//GET ROUTER
router.get('/update/:id', (req,res,next) => {
  const placeID = req.params.id;
  console.log(placeID);
  Places.findById(placeID)
  .then(place =>{
    console.log(place);
    res.render('./places/update', { place });
  })
  .catch(error =>{
    next(error);
  });
});

//POST ROUTER
router.post('/update/:id', (req,res,next) =>{
  const placeID = req.params.id;
  Places.findByIdAndUpdate(placeID, {
    name: req.body.name,
    type: req.body.type
  })
  .then(updatePlace =>{
    res.redirect('/places')
    // console.log(updatePlace);
  })
  .catch(error =>{
    next(error);
  });
});


//DELETE

//GET ROUTER NOT NEEDED IN THIS CASE
//POST ROUTER
router.post('/delete/:id', (req,res,next) =>{
  const deleteID = req.params.id;
  Places.findByIdAndRemove(deleteID)
  .then(deletedPlace =>{
    // console.log(deletedPlace)
    res.redirect('/places');
  })
  .catch(error =>{
    next(error);
  });
});



//READ SPECIFIC PLACE BY ID
router.get('/:id', (req, res, next) => {
  const placeID = req.params.id;
  Places.findById(placeID)
  .then((place) =>{
    res.render('./places/singleplace', { place });
  })
  .catch((error) =>{
    next(error);
  });
});

module.exports = router;
