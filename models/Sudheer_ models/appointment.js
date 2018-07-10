var mongoose = require('mongoose');
var Schema = mongoose.Schema;
hSchema = new Schema({
  name : String,
  phonenumber :String,
  email :String,
  address:String,
  location:String,
  message:String,
  date:String

});
module.exports = mongoose.model('appointment', hSchema);
