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
  getHotels: function(req, res, next){
    Hotel.find(function(err, hotels){
      if(err) {
        return res.json(err);
      }
      console.log(hotels)
      res.json(hotels);
      next();
    });
  },
  /**
   * [addHotel description]
   * @param {[req]}
   * @param {[res]}
   */
  // api call function to add hotel profile to database
  addHotel: function(req, res, next) {
    var hotel = new Hotel(req.body);
    hotel.save(function(err) {
      if(err) {
        return res.json(err);
      }
      res.json({message:'Hotel Added'});
      next();
    });
  },
  /**
   * [editHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to edit specific hotel based on provided id
  editHotel: function(req, res, next){
    // grab the specified hotel from database
    Hotel.findOne({_id:req.params.id}, function(err, hotel){
      if(err) {
        res.json(err);
      } else {
        for(prop in req.body){
          hotel[prop] = req.body[prop];
        }

        // return modified hotel profile to database
        hotel.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({ message: 'Hotel updated!' });
          }
        });
      }
      next();
    });
  },
  /**
   * [getSingleHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to grab specific hotel in database
  getSingleHotel: function(req, res, next){
    Hotel.findOne({_id:req.params.id},function(err, hotel) {
      if(err) {
        return res.json({message: 'Error!'});
      }
      res.json(hotel);
      next();
    });
  },
  /**
   * [deleteHotel description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  // api call function to delete hotel profile from database based on specified id
  deleteHotel: function(req, res, next){
    Hotel.remove({
      _id: req.params.id
    }, function(err, hotel) {
      if (err) {
        return res.json({message: 'Internal server error'});
      }
      if (hotel) {
        res.json({ message: 'Successfully deleted' });
      }
      next();
    });
  }
};