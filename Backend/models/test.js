var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var uniqueValidator=require('mongoose-unique-validator');
  

var testSchema = new Schema({

 name: {
        type: String,
        required: [true, ' name must be provided'] 
        
    },
 email: {
        type: String,
        required:[true, 'Email address cannot be left blank'] , 
        unique :true
    },
  password: {
    type: String,
    required:true,
    //required:[true,  'password cannot be left blank'] 
  },
  adresse: {
        type: String,
        required:[true,  'address cannot be left blank']  
    }, 
    url: {
        type: String,
        required:[true,  'type cannot be left blank']  
    },






})  ;
testSchema.plugin(uniqueValidator);
module.exports=mongoose.model('Test',testSchema);