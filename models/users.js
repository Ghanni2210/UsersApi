const Joi = require('joi');// "joi": "^13.1.0"  //for validating and err responses
const mongoose =require('mongoose');


const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
  },
  email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50,
    unique:true
  },
  /* simplify use of hashed passwords. 
  Storing passwords in plain-text is bad.
   ... The hashed password contains both the 
   cryptographic algorithm that was used as 
   well the salt, so all that is needed 
   to verify aplain-text password is the hashed password itself*/
  password:{
    type:String,
    required:true,
    minlength:5,
    maxlength:1024,
  }

});

const User=mongoose.model('User',userSchema);


function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(50).required().email(), //.email is method for validating email
    password:Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}


exports.User=User;
exports.validate=validateUser;