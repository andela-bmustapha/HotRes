// import the hotel model file
var Hotel = require('../models/hotel.model');

module.exports = {
  /**
   * [getHotels description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to get all hotels stored in database
  getHotels: function(req, res){
    Hotel.find(function(err, hotels){
      if(err) {
        res.json(err);
      }
      res.json(hotels);
    });
  },
  /**
   * [addHotel description]
   * @param {[req]}
   * @param {[res]}
   */
  // api call function to add hotel profile to database
  addHotel: function(req, res) {
    var hotel = new Hotel(req.body);
    hotel.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.send({message:'Hotel Added'});
    });
  },
  /**
   * [editHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to edit specific hotel based on provided id
  editHotel: function(req, res){
    // grab the specified hotel from database
    Hotel.findOne({_id:req.params.id}, function(err, hotel){
      if(err) {
        res.json(err);
      }
      for(prop in req.body){
        hotel[prop] = req.body[prop];
      }

      // return modified hotel profile to database
      hotel.save(function(err) {
        if (err) {
          res.json(err);
        }
        res.json({ message: 'Hotel updated!' });
      });
    });
  },
  /**
   * [getSingleHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to grab specific hotel in database
  getSingleHotel: function(req, res){
    Hotel.findOne({_id:req.params.id},function(err, hotel) {
      if(err) {
        res.json(err);
      }
      res.json(hotel);
    });
  },
  /**
   * [deleteHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to delete hotel profile from database based on specified id
  deleteHotel: function(req, res){
    Hotel.remove({
      _id: req.params.id
    }, function(err, hotel) {
      if (err) {
        res.json(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  }
};