var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = new Schema({
    name: String,
    managerId: String,
    location: [{ state: String, city: String }],
    rating: String,
    numberOfRooms: Number,
    available: Boolean
});

module.exports = mongoose.model('Hotel', hotelSchema);