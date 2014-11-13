var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//var User = mongoose.model('User');


for (var name in mongoose.models) {

    var model = mongoose.models[name];

    var Model = mongoose.model(model.modelName);

    router.get('/' + model.collection.name, function(req, res) {

		Model.find(req.body).exec(function (err, data) {
	        
	        res.json(data);

		})

    }).get('/' + model.collection.name + '/:id', function(res, res) {

		// Model.findOne().exec(function (err, data) {
	        
	 //        res.json(data);

		// })

    }).post(function(res, res) {

    }).put(function(res, res) {

    }).delete(function(res, res) {

    });

}


module.exports = router;
