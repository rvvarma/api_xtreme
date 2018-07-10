var mongoose = require('mongoose');
var Schema = mongoose.Schema;
adddetail = new Schema({
    noofclass: {
         classid:String,

        classname: String,
        section:String,
        terms: String,
        fee: String
    }

});

module.exports = mongoose.model('adddetail', adddetail);
