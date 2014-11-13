var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//var User = mongoose.model('User');


for(var name in mongoose.models) {
	
	var model = mongoose.models[name];

	console.log(model.modelName);

}

router.get('/user', function(req, res) {

        res.json(true);

    }).get(function(res, res) {

    }).post(function(res, res) {

    }).put(function(res, res) {

    }).delete(function(res, res) {

    });

module.exports = router;
