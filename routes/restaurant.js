'use strict';

const { Router } = require('express');
const router = new Router();
const Restaurant = require('./../models/restaurant');


router.get('/list', (req, res, next) => {
  console.log('get para list is working');
});