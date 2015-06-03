// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
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