var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Manager', managerSchema);