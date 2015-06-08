// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
var hotelSchema = new Schema({
    name: { type: String, required: true },
    managerId: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    description: { type: String, required: true },
    reviews: [ { name: { type: String }, review: { type: String } } ]
});

module.exports = mongoose.model('Hotel', hotelSchema);