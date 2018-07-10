var mongoose=require('mongoose');

var Schema = mongoose.Schema;


var schema= new Schema({
  "title":{type:String},
  "start":{type:String},
    "end":{type:String}



})

module.exports=mongoose.model('calander',schema);
