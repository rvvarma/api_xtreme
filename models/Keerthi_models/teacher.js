//teacher data

var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;


var schema= new Schema({
    "School_Id" : {type:String},
    "Teacher_Id":{type:String},
    "First_Name": {type:String},
    "Last_Name": {type:String},
    "Gender":{type:String},
    "Date_of_birth": {type:String},
    "Age": {type:Number},
    "Qualification": {type:String},
    "Experience": {type:String},
    "Package": {type:String},
     "Address":{type:String},
    "Phone_Number":  {type:Number},
    "Previous_School":{type:String},
    "Email_id":{type:String}

})

module.exports=mongoose.model('teachers',schema);
