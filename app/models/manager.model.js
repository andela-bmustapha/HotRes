var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    imageUrl: { type: String }
});

module.exports = mongoose.model('Manager', managerSchema);
