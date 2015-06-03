var Hotel = require('../models/hotel.model');

module.exports = {
  getManagers: function(req, res){
    Manager.find(function(err, managers){
      if(err) {
        res.json(err);
      }
      res.json(managers);
    });
  },
  addManager: function(req, res) {
    var manager = new Manager(req.body);
    manager.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.json({message:'Manager Added'});
    });
  },
  editManager: function(req, res){
    Manager.findOne({_id:req.params.id}, function(err, manager){
      if(err) {
        res.json(err);
      }
      for(prop in req.body){
        manager[prop] = req.body[prop];
      }

      // save the movie
      manager.save(function(err) {
        if (err) {
          res.json(err);
        }
        res.json({ message: 'Manager updated!' });
      });
    });
  },
  getSingleManager: function(req, res){
    Manager.findOne({_id:req.params.id},function(err, manager) {
      if(err) {
        res.json(err);
      }
      res.json(hotel);
    });
  },
  deleteManager: function(req, res){
    Manager.remove({
      _id: req.params.id
    }, function(err, manager) {
      if (err) {
        res.json(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  }
}