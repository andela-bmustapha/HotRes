var Manager = require('../models/manager.model');
var Bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

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
    // check if username has been taken
    Manager.findOne({username: req.body.username}, function(err, manager) {
      if (err) {
        return res.json({ message: 'Server Error' });
      }
      if (manager) {
        return res.json({ message: 'Username already taken!' });
      }
      next();
    });

    var manager = new Manager(req.body);
    var hash = Bcrypt.hashSync(req.body.password); // to create encrypted password
    manager.password = hash;
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
    Manager.remove({ _id: req.params.id }, function(err, manager) {
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
    var manager = new Manager();
    // create a token for user
    var token = jwt.sign(manager, secrets.sessionSecret, { expiresInMinutes: 1440 });
    // hash the incomming password
    var hashedPassword = Bcrypt.hashSync(req.body.password);

    Manager.find({username: req.body.username}, function(err, manager) {
      if (err) {
        res.json({message: 'Internal Server Error!'});
      }

      if (manager.length === 0) {
        res.json({message: 'Username does not exist!'});
      } else if (manager.length === 1) {
        if (manager[0].password === hashedPassword) {
          // return formatted object
          res.json({
            id: manager[0]._id,
            name: manager[0].name,
            username: manager[0].username,
            imageUrl: manager[0].imageUrl,
            token: token
          });
        } else {
          res.json({message: 'Password Incorrect!'});
        }
      }
      next();
    });
  }
}