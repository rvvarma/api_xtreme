var mongoose = require('mongoose');
var Schema = mongoose.Schema;
studenttoclass = new Schema({

         studentid:String,

        class: String,
        section:String,
        year:String
    

});

module.exports = mongoose.model('studenttoclass', studenttoclass);
