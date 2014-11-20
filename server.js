var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/test');

require('./schema');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('test');
});

var apiRouter = require('./lib/index');
	
app.use('/api/', apiRouter);

app.listen(3000, function () {
	console.log('Server started');
});