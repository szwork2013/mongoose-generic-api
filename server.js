var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var path = require('path');

mongoose.connect('mongodb://ec2-54-209-180-165.compute-1.amazonaws.com/techome');
require('./schema');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('test');
});

var apiRouter = require('./src/index');
	
app.use('/api/1/', apiRouter);

app.listen(3000, function () {
	console.log('Server started');
})