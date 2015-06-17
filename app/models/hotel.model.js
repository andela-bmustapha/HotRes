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
    pictureUrl: { type: String},
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true},
    phone: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    website: { type: String },
    bookable: { type: String, required: true },
    photoGallery: [ { type: String } ],
    reviews: [ { name: { type: String }, review: { type: String } } ]
});

module.exports = mongoose.model('Hotel', hotelSchema);