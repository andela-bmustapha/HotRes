var Hotel = require('../models/hotel.model');

module.exports = {
  getHotels: function(req, res){
    Hotel.find(function(err, hotels){
      if(err) {
        res.send(err);
      }
      res.json(hotels);
    });
  },
  addHotel: function(req, res) {
    var hotel = new Hotel(req.body);
    hotel.save(function(err) {
      if(err) {
        res.send(err);
      }
      res.send({message:'Hotel Added'});
    });
  },
  editHotel: function(req, res){
    Hotel.findOne({_id:req.params.id}, function(err, hotel){
      if(err) {
        res.send(err);
      }
      for(prop in req.body){
        hotel[prop] = req.body[prop];
      }

      // save the movie
      hotel.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Hotel updated!' });
      });
    });
  },
  getSingleHotel: function(req, res){
    Hotel.findOne({_id:req.params.id},function(err, hotel) {
      if(err) {
        res.send(err);
      }
      res.json(hotel);
    });
  },
  deleteHotel: function(req, res){
    Hotel.remove({
      _id: req.params.id
    }, function(err, hotel) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  }
};