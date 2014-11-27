var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var path = require('path');

mongoose.connect('mongodb://localhost:27017/database-name');

require('./schema');

hbs.registerPartials(__dirname + '/views');

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.static(__dirname + '/app'));
app.use(bodyParser.json());

var apiRouter = require('./lib/index');
app.use('/api/', apiRouter);
	
app.get('/', function (req, res) {

	res.render('index.html', {

		schema: JSON.stringify(apiRouter.schema)
		
	});

});


app.listen(3000, function () {

	console.log('Server started');

});