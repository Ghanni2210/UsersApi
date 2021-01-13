const express = require('express');
const {User,validate}=require('../models/users');
const router = express.Router();
const bcrypt =require('bcrypt');
const _ =require('lodash');


router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});


router.post('/',async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let users=await User.findOne({email:req.body.email});
  if (users)  {
    return res.status(400).send({message : 'User Already Registered.', data : users});
  }

// user=new User(_.pick(req.body,['name','email','password'])); lowdash

users = new User({
  name :req.body.name,
  email:req.body.email,
  password:req.body.password
});
const salt =await bcrypt.genSalt(10);
users.password=await bcrypt.hash(users.password,salt);
await users.save();
res.send(users);

});


router.delete('/:id',async(req,res)=>{
  const users = await User.findByIdAndRemove(req.params.id);

  if (!users) return res.status(404).send('The user with the given ID was not found.');

  res.send(users);
});


router.get('/:id', async (req, res) => {
  const users = await User.findById(req.params.id);

  if (!users) return res.status(404).send('The customer with the given ID was not found.');

  res.send(users);
});

module.exports=router;