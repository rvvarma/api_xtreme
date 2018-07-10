
//admin passwords

var mongoose=require('mongoose');
var Schema = mongoose.Schema;


var schema= new Schema({
    "Id" : {type:String},
    "School_Id" : {type:String},
    "Parent_type":{type:String},
    "Password":{type:String},
    "Email_id":{type:String},
     "type": {type:String}

    })

module.exports=mongoose.model('passwords',schema);
