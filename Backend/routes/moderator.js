var express = require('express');
var router = express.Router();
var userCtrl=require('../models/user');
var user = require('../controllers/moderator');

const multer = require('../midelleware/multer-config');
const { _router } = require('../app');

/* GET home page. */

router.post('/addCar/:idUser',multer,user.addCar);
router.get('/getCarsByIdUser/:idUser',user.getCarsByIdUser);
//router.put('/updateCar/:idCar',multer,user.updatecar);
//router.delete('/deleteCar/:id',user.deleteCar);

router.get('/getAllUsers',user.getAllUsers);
router.post('/addUser',user.add);
//router.get('/login',user.login);
router.get('/getUserByEmail',user.getUserByEmail);






module.exports = router;
