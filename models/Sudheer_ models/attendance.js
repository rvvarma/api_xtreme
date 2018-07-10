var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var 
attendance = new Schema({
  teacherid:String,
  schoolid: String,
class:String,section:String, 


 data:[{

stid:String,
status:String
}],   
date: {
  created:  {type: Date, default: Date.now},
}


});

module.exports = mongoose.model('attendance', attendance);
