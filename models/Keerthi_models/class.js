var mongoose=require('mongoose');


var Schema = mongoose.Schema;

var schema = new Schema({
  "School_Id" : {type:String},
  "Teacher_Id" : {type:String},
  "Teacher_Name":{type:String},
  "Class":{type:String},
  "Section":{type:String},
  "Subject":{type:String},
  "Teacher_Type":{type:String}

})

module.exports=mongoose.model('class-details',schema);
