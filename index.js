require('express-async-errors'); // @3.1.1 (used for monkey patching asyncMiddleware code so we no need to decorate asyncmiddleware everywhere)
const winston =require('winston');//@3.3.3(used for logging error so that we can be aware which areas need to worked on)
require('winston-mongodb');//@3.0.0 for logging error msgs on mongodb server.
const error=require('./middleware/error');
// const config=require('config'); //"config": "^1.29.4"
const mongoose=require('mongoose');
const users = require('./Routes/users');
const express = require('express');
const app = express();

winston.add(new winston.transports.File({filename:'logfile.log'}));//we transport all errors to this file so can beread in future.
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/userErrLog'}));//we transport log file to mongodb.


mongoose.connect('mongodb://localhost/users')
.then(()=>console.log('Connected to MongoDB.....'))
.catch(error=>console.error('couldnt connect to MongoDB...'));


app.use(express.json());
app.use('/users',users);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));