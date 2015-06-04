var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    name: { type: String },
    username: { type: String },
    password: { type: String },
    token: { type: String },
    hotel: { type: String }
    // {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'}
});

module.exports = mongoose.model('Manager', managerSchema);
