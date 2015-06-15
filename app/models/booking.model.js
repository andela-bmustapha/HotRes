// import the mongoose module
var mongoose = require('mongoose');

// create a mongoose object
var Schema = mongoose.Schema;

/* 
  instantiate a mongoose schema object to store
  meta info of database object
*/
var bookingSchema = new Schema({
    hotelId: { type: String, required: true },
    hotelName: { type: String, required: true },
    managerId: { type: String, required: true },
    bookerName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    comment: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);