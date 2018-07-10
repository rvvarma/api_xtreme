var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileschema = new Schema({



    date: {"type":Date,"default":Date.now},
    teacherid: { type: String },
    schoolid: { type: String },
    class: { type: String },
	section:{type:String},
	assignment:[{
	subject:{type:String},
    description:{type:String},
	title:{type:String},
    file:{type:String},
	filetype:{type:String}
   }]

});
module.exports = mongoose.model('teacherdetails', fileschema);
