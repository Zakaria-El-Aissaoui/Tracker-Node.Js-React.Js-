var User = require('../models/user');
var Car = require('../models/car');
const fs = require('fs');

var bcrypt=require('bcrypt');

/////////////////////////////
exports.getAllUsers= function (req,res,next){

	User.find({type:'user'}).exec((err, user) => {
        if (err) {
            res.json({
                result: "failed",
                data: [],
                messege: `Error is : ${err}`
            });
        } else {
            res.json({
                result: "ok",
                data: user,
                count: user.length,
                messege: "list all users"
            });
        }
    });
}

exports.add = (req, res, next) => {
    if(req.body.password){
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          name:req.body.name,
          email: req.body.email,
          password: hash,
          adresse:req.body.adresse,
         type:req.body.type

        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(401).json({ error }));
      })
      .catch(error => res.status(501).json({ error  }));}
      else{
          res.status(400).json({message: 'password cannot '});
      }
  };
////////////////////////////////////////////////////
 /* exports.login= function (req,res,next){
    if(req.body.email && req.body.password){
	User.findOne({email : req.body.email}).then( user => {

            if (!user){
                 res.status(400).json({
                    result: "ok",
                  
                    messege: "moderator non trouvé"
                });
            }
            else{
            bcrypt.compare(req.body.password, user.password).then(valid =>{
                if(!valid){
                     res.status(400).json({error:'mot passe est incorrect'}) ;
                }else{
                res.status(400).json({
                    result: "ok",
                    data: user,
                    count: user.length,
                    messege: "moderator trouvé"
                });}
                


            }
            ).catch(error => res.status(500).json({ error }));}
            
})}else{
    res.status(400).json({error:'form'}) ;
}
}*/

//////////////////////////////

exports.getUserByEmail= function (req,res,next){
    User.findOne({email : req.body.email}).then( user => {

        if (user){
             res.status(200).json({
                result: "ok",
                data:user,
              
                messege: "user  trouvé"
            });
        }
        else{
            res.status(400).json({
            result: "ok",
            data:user,
          
            messege: "user  non trouvé"
        });

        }
        
})

	
}
/*
exports.addtest = (req, res, next) => {
    //const thingObject = JSON.parse(req.body.thing);
  //delete thingObject._id;
   // bcrypt.hash(req.body.password, 10)
      //.then(hash => {
        const user = new User({
           // ...thingObject,

          name:req.body.name,
         email: req.body.email,
          password: req.body.password,
         adresse:req.body.adresse,
          url: `${req.protocol}://${req.get('host')}/images/${req.file.image}`
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
     // })
     // .catch(error => res.status(501).json({ error  }));}
      
    ;
}*/



//////////////////////////////////////

exports.addCar =function (req, res, next)  {
    
   
        const car = new Car({
          idUser:  req.params.idUser,
          make:req.body.make,
          
          
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        });
        car.save()
          .then(() => res.status(201).json({ message: 'added !' }))
          .catch(error => res.status(400).json({ error }));
      
      
  };

///////////////////////////////////////

exports.getCarsByIdUser = (req, res, next) => {
    
   
    Car.find({idUser : req.params.idUser}).then( car => {

        if (car){
             res.status(200).json({
                result: "ok",
                data:car,
              
                messege: "car "
            });
        }
        else{
            res.status(400).json({
            result: "ok",
            data:car,
          
            messege: "car  non trouvé"
        });

        }
        
})
  
  
};
/*
exports.deleteCar = (req, res, next) => {
    Car.findOne({ _id: req.params.id })
      .then(car => {
        const filename = car.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Car.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'the car deleted !'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
      )
      .catch(error => res.status(500).json({ error }));
  };














/*
exports.updatecar = (req, res, next) => {
    
   
    const carObject = req.file ?
    {
      name:req.body.name,
      
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Car.updateOne({ _id: req.params.idCar }, { ...carObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  
  
};*/










