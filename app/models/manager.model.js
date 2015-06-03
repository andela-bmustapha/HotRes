var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    name: {type: String},
    hotel: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'}]
});

module.exports = mongoose.model('Manager', managerSchema);
