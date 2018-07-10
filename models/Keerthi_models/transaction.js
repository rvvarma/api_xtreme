var mongoose=require('mongoose');

var Schema = mongoose.Schema;


var schema= new Schema({
     "Student_Id":{type:String},
    "Amount": Number,
    "Term": Number,
    "Payment_Mode": {type:String},

    "date":{type:String},
    "Fee_Paid": Number,
    "Total_Fee": Number,
    "Pending_Fee":Number

})

module.exports=mongoose.model('transaction',schema);