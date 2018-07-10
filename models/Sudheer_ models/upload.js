
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
upload = new Schema({
    id: Number,
    avatar: String


});
module.exports = mongoose.model('upload', upload);
