
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
config = new Schema({
  classes:{

    classname:String,
    sections:[String],
  subjects:[String],
  terms:[String],
  studentlimit:String,

    fee:Number,
    updated: { type: Date, default: Date.now },

  }


});
module.exports = mongoose.model('config', config);
