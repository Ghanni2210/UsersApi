const winston = require("winston");

module.exports=function(err,req,res,next){
  // log the execption
winston.error(err.message,err);

/* log levels
1.error
2.warn
3.info
4.verbose
5.debug
6.silly
*/

  res.status(500).send("Server Issues.");
}