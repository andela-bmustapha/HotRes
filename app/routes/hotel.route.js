var express = require('express');

var Hotels = require('../controllers/hotel.controller');

//configure routes
module.exports = function(router){

router.route('/hotels')
  .get(Hotels.getHotels)
  .post(Hotels.addHotel);

router.route('/hotels/:id')
  .put(Hotels.editHotel)
  .get(Hotels.getSingleHotel)
  .delete(Hotels.deleteHotel);
  
};