var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;


var schema= new Schema({
    "School_Name":{type:String},
    "School_Id" : {type:String},
    "Employee_Id":{type:String},
    "First_Name": {type:String},
    "Last_Name": {type:String},
    "Gender":{type:String},
    "Date_of_birth": {type:String},
    "Age": Number,
    "Qualification": {type:String},
    "Experience": {type:String},
     "Address":{type:String},
     "City": {type:String},
    "Phone_Number":  Number,
    "Pin_Code": Number,
    "Email_id":{type:String}

})

module.exports=mongoose.model('adminDetails',schema);
