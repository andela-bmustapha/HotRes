var hotelRoutes = require('./hotel.route');
var managerRoutes = require('./manager.route');

module.exports = function(router){

   
   hotelRoutes(router);
   managerRoutes(router);
};