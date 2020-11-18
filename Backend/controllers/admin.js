const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const User = require('../models/user');
const Car = require('../models/car');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema } = require('../validation/validate');

module.exports = {
  login: (req, res, next) => {
      User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
            return res.status(401).json({ error: 'Admin not found !' });
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
                )
                });
              })
              .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
       
  },

  addM_A: (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          name: req.body.name,  
          email: req.body.email,
          password: hash,
          adresse:req.body.adresse,
          type: req.body.type
        });
        user.save()
          .then(() => res.status('201').json({msg: `${req.body.type} created`}))
          .catch((err) => res.status("500").json({msg: err}))
      })
      .catch(err => res.status('400').json({msg: err}));
      
  }, 
  
  ////////
  getAllUsers: (req,res,next) => {
      User.find({type: 'user'})
        .then( users => {res.status('200').send(users)});
  },

  /*
  newUser: async (req,res,next) => {
      const newuser = new User(req.body);

      const {error , value } = signupSchema.validate(req.body); 
      if (error) { 
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
      }
      else {
      await newuser.save()
        .then( res.status('201').json({msg: "User created"}));
      }
  },
*/

///////
  getUser: async (req,res,next) => {
    await User.findById({_id: req.params.userId})
      .then(user => { res.status('200').json(user) });
  },
  


  /*
  replaceUser: async (req,res,next) => {
    // force admin to enter all fields
      const newUser = req.body;
      await User.findByIdAndUpdate({_id: req.params.userId}, newUser, {new: true})
        .then(user => {res.status('200').json(user)});
  },
*/

/*
  updateUser: async (req,res,next) => {
    // let admin enter what ever he/she want
    const newUser = req.body;
    await User.findByIdAndUpdate({_id: req.params.userId}, newUser, {new: true})
      .then(user => {res.status('200').json({msg: "user updated"})});    
  },
*/

/*
  deleteUser: async (req,res,next) => {
    await User.findByIdAndDelete({_id: req.params.userId})
      .then(res.status('200').send('User deleted !'));
  },
*/



/*
  getAllCars: (req,res,next) => {
    Car.find()
      .then( cars => {res.status('200').json(cars)});
  },

  newGlobalCar: async (req,res,next) => {
      const newCar = new Car(req.body);
      await newCar.save()
        .then(globalCar =>
            {
                res.status('201').json(globalCar);
            }
        );
  },

  getCar: async (req,res,next) => {
    await Car.findById({_id: req.params.carId})
      .then(car => { res.status('200').json(car) });
  },

  replaceCar: async (req,res,next) => {
    // forces all fields
      const newCar = new Car(req.body);
      await Car.findByIdAndUpdate({_id: req.params}, newCar)
        .then(car => {res.status('200').json(car)});
  },

  updateCar: async (req,res,next) => {
      // do not forces all fields
      const newCar = new Car(req.body);
      await Car.findByIdAndUpdate({_id: req.params}, newCar)
        .then(car => {res.status('200').json(car)});
  },

  deleteCar: async (req,res,next) => {
    await Car.findByIdAndDelete({_id: req.params})
      .then(res.status('200').send('Car deleted !'));
  }
  */
};