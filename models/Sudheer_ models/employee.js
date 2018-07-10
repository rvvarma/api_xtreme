/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;
results = new Schema({
  "id": String,
  "name": String,
  "english": String,
  "mathes": String,
  "science": String,
  "history": String,
  "locallanguage": String,
  "total": String,
  "percentage": String
});
module.exports = mongoose.model('results', results);
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
student = new Schema({
  photo:String,
  admissionnumber:String,
  stid:{type:String},
  name:{type:String,required:true},
  lastname:String,
  mothername:String,
  fathername: String,
  guardian:String,
  phonenumber: String,
  mailid:String,
  class:String,
  bloogroup:String,
  address:String,
  School_Id:String
});
module.exports = mongoose.model('studentinfos', student);
