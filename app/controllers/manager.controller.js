var Manager = require('../models/manager.model');
var Bcrypt = require('bcrypt-nodejs');

module.exports = {
  /**
   * [getManagers description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getManagers: function(req, res, next){
    Manager.find(function(err, managers){
      if(err) {
        res.json(err);
      }
      if (managers) {
        res.json(managers);
      }
      next();
    });
  },
  /**
   * [addManager description]
   * @param {[req]}
   * @param {[res]}
   */
  addManager: function(req, res, next) {
    var manager = new Manager(req.body);
    var hash = Bcrypt.hashSync(req.body.username + req.body.password + new Date().getTime()); // to create user token
    manager.token = hash;
    manager.save(function(err) {
      if(err) {
        res.json(err);
      } else {
        res.json({message:'Manager Added'});
      }
      next();
    });
  },
  /**
   * [editManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editManager: function(req, res, next){
    Manager.findOne({_id:req.params.id}, function(err, manager){
      if(err) {
        res.json(err);
      } else {
        for(prop in req.body){
          manager[prop] = req.body[prop];
        }
        // return edited manager object to database
        manager.save(function(err) {
          if (err) {
            res.json(err);
          } else {
            res.json({ message: 'Manager updated!' });
          }
        });
      }
      next();
    });
  },
  /**
   * [getSingleManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getSingleManager: function(req, res, next){
    Manager.findOne({_id:req.params.id},function(err, manager) {
      if(err) {
        res.json({message: 'Manager not found!'});
      }
      if (manager) {
        res.json(manager);
      }
      next();
    });
  },
  /**
   * [deleteManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteManager: function(req, res, next){
    Manager.remove({
      _id: req.params.id
    }, function(err, manager) {
      if (err) {
        res.json(err);
      }
      if (manager) {
        res.json({ message: 'Successfully deleted' });
      }
      next()
    });
  },
  /**
   * [managerLogin description]
   * @param  {[req]}
   * @param  {[res]}
   * @param  {Function}
   * @return {[void]}
   */
  managerLogin: function(req, res, next) {
    Manager.find({username: req.body.username}, function(err, manager) {
      if (manager.length === 0) {
        res.json({message: 'Username does not exist!'});
      } else if (manager.length === 1) {
        if (manager[0].password === req.body.password) {
          // return formatted object
          res.json({
            name: manager[0].name,
            username: manager[0].username,
            token: manager[0].token
          });
        } else {
          res.json({message: 'Password Incorrect!'});
        }
      }
      next();
    });
  }
}