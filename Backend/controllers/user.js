const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Car = mongoose.model('Car');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const car = require('../models/car');

module.exports = {
  signup: (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          name: req.body.name,  
          email: req.body.email,
          password: hash,
          adresse:req.body.adresse,
          type: 'user'
        });
        user.save()
          .then(() => res.status(201).json({ message: 'User created' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json( {error} ));
  },
  
  login: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Password incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              ),
              type: user.type
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  },

  getUserCars: async (req,res,next) => {
    Car.find({ userId: req.params.userId })
      .then( car => {
        res.status(200).json(car);
      })
    .catch((err) => {
      res.status('400').json(err);
    });
    
    /*  const { userId } = req.params;
    const user = await User.findById(userId);
    console.log('user cars', user);
  */

  }

 /* newUserCar: async (req,res,next) => {
    
      /*
    
    // Create a new note and pass the req.body to the entry
    const newCar = new Car({
      make: req.body.make,
      model: req.body.model,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
    newCar.save()
    .then( (dbCar) => {
      // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return User.findOneAndUpdate({ _id: req.params.userId }, {$push: {car: dbCar._id}}, { new: true });
    })
    .then(function(dbUser) {
      // If we were able to successfully update a Product, send it back to the client
      res.status('201').json(dbUser);
    })
    .catch( (err) => {
      // If an error occurred, send it to the client
       
        res.status('500').json(err)
        });
    }
    
    


    //create new car
    const newCar = new Car (req.body);
    //save car
    await newCar.save()
      .then( car => { res.status('201').json(car) });
    //get user
    const carUser = await User.findById({ _id: req.params.userId });
    console.log('user found by Id', carUser);
    //assign car to the user
    carUser.car.push(newCar);
    //save user
    await carUser.save(); 
    res.status(201).json(carUser);
    }
    */
  
}

