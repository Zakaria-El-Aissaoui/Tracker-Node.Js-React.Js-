const express = require('express');
const router = require('express-promise-router')();
//const router = express.Router();
const adminCtrl = require('../controllers/admin')


//router.post('/login', adminCtrl.login);

/*router.route('/cars')
    .get(adminCtrl.getAllCars)   // get all cars
    .post(adminCtrl.newGlobalCar);   // add car (global)
router.route('/cars/:carId')
    .get(adminCtrl.getCar)
    .put(adminCtrl.replaceCar)
    .patch(adminCtrl.updateCar)
    .delete(adminCtrl.deleteCar); */
router.route('/addM_A')
    .post(adminCtrl.addM_A);


router.route('/users')
    .get(adminCtrl.getAllUsers)   // get all usrs
//    .post(adminCtrl.newUser);   // add user
router.route('/users/:userId')
    .get(adminCtrl.getUser)
/*    .put(adminCtrl.replaceUser)
    .patch(adminCtrl.updateUser)
    .delete(adminCtrl.deleteUser); */

module.exports = router;