var express = require('express');

var Managers = require('../controllers/manager.controller');

//configure routes

module.exports = function(router){

router.route('/managers')
  .get(Managers.getManagers)
  .post(Managers.addManager);

router.route('/managers/:id')
  .put(Managers.editManager)
  .get(Managers.getSingleManager)
  .delete(Managers.deleteManager);

};
