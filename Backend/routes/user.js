const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const User = require('../models/user');
const Car = require('../models/car');

const userCtrl = require('../controllers/user');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.route('/:userId')
  .get(userCtrl.getUserCars)
//  .post(userCtrl.newUserCar);


module.exports = router;