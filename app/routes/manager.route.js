var Manager = require('../models/manager.model');
var express = require('express');

//configure routes

module.exports = function(router){

router.route('/managers')
  .get(function(req, res){
    Manager.find(function(err, managers){
      if(err) {
        res.json(err);
      }
      res.json(managers);
    });
  })
  .post(function(req, res) {
    var manager = new Manager(req.body);
    manager.save(function(err) {
      if(err) {
        res.json(err);
      }
      res.json({message:'Manager Added'});
    });
  });

router.route('/managers/:id')
  .put(function(req, res){
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
  })
  .get(function(req, res){
    Manager.findOne({_id:req.params.id},function(err, manager) {
      if(err) {
        res.json(err);
      }
      res.json(hotel);
    });
  })
  .delete(function(req, res){
    Manager.remove({
      _id: req.params.id
    }, function(err, manager) {
      if (err) {
        res.json(err);
      }
      res.json({ message: 'Successfully deleted' });
    });
  });

};
