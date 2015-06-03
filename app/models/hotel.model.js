var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    name: { type: String },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager' },
    state: { type: String },
    city: { type: String },
    rating: { type: String },
    numberOfRooms: { type: Number },
    available: { type: Boolean }
});

module.exports = mongoose.model('Hotel', hotelSchema);