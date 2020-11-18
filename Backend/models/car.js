var mongoose= require('mongoose');
var Schema= mongoose.Schema;
  

var carSchema = new Schema({

 idUser: {
        type: String,
        required: true,  
        
    },
 image: {
        type: String,
        required:true, 
     },
 make: {
        type: String,
        required:true, 
     },
 latitude: {
    type: String,
    
  },
  longitude: {
        type: String,
       
    }, 
    date: {
        type: String,
        default:Date.now(),   
    },
    






})  ;
module.exports=mongoose.model('Car',carSchema);