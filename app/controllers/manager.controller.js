var Manager = require('../models/manager.model');

module.exports = {
  /**
   * [getManagers description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getManagers: function(req, res){
    Manager.find(function(err, managers){
      if(err) {
        res.json(err);
      }
      if (managers) {
        res.json(managers);
      }
    });
  },
  /**
   * [addManager description]
   * @param {[req]}
   * @param {[res]}
   */
  addManager: function(req, res) {
    var manager = new Manager(req.body);
    manager.save(function(err) {
      if(err) {
        res.json(err);
      } else {
        res.json({message:'Manager Added'});
      }
    });
  },
  /**
   * [editManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  editManager: function(req, res){
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
    });
  },
  /**
   * [getSingleManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  getSingleManager: function(req, res){
    Manager.findOne({_id:req.params.id},function(err, manager) {
      if(err) {
        res.json({message: 'Manager not found!'});
      }
      if (manager) {
        res.json(manager);
      }
    });
  },
  /**
   * [deleteManager description]
   * @param  {[req]}
   * @param  {[res]}
   * @return {[void]}
   */
  deleteManager: function(req, res){
    Manager.remove({
      _id: req.params.id
    }, function(err, manager) {
      if (err) {
        res.json(err);
      }
      if (manager) {
        res.json({ message: 'Successfully deleted' });
      }
    });
  }
}