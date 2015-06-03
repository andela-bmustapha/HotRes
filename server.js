// Load Our Modules

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./app/routes');
var router = express.Router();
var app = express();

app.set('port', process.env.PORT || 8000);

//connect to our database
//Ideally you will obtain DB details from a config file
// var connectionString = 'mongodb://toystars:Rooney1990@ds043002.mongolab.com:43002/nodesample'

var database = require('./config/db')

mongoose.connect(database.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', router);
routes(router);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});