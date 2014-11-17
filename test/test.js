var assert = require("assert");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');



var testModelId = '';
var testModelObject;


var getTestModelObject = function() {
    return {
        date: new Date(),
        title: 'title',
        description: 'description'
    }
};

before(function(done) {

    var testSchema = new Schema({
        date: {
            type: Date,
            required: true
        },
        title: String,
        description: String
    });

	testModelObject = getTestModelObject();

    testModel = mongoose.model('Test', testSchema);

    var apiRouter = require('./../src/index');

    app.use(bodyParser.json());
    app.use('/api/', apiRouter);


    mongoose.connect("mongodb://localhost:27017/test", function() {

        console.log('Mongo connected');

        app.listen(3000, function() {

            console.log('Server started');

            done();

        });

    });

});


describe('Testing API', function() {

    it('Creating model', function(done) {
    	

        request.post({
            url: 'http://localhost:3000/api/tests',
            json: testModelObject
        }, function(err, httpResponse, body) {

            assert.equal(err, null);
            assert.equal(httpResponse.statusCode, 200);
            assert.equal(body.title, testModelObject.title);
            assert.equal(body.description, testModelObject.description);

            testModelId = body._id;


            // TODO
            // check assert of the date 
            // assert.equal(body.date, testModelObject.date);

            done();

        });

    });

    it('Getting model', function(done) {
    	
        request.get({
            uri: 'http://localhost:3000/api/tests/' + testModelId
        }, function(err, httpResponse, body) {

        	body = JSON.parse(body);

            assert.equal(err, null);
            assert.equal(httpResponse.statusCode, 200);
            assert.equal(body.title, testModelObject.title);
            assert.equal(body.description, testModelObject.description);

            done();

        });

    });

    it('Updating model', function(done) {

        request.put({
            uri: 'http://localhost:3000/api/tests/' + testModelId,
            json: testModelObject
        }, function(err, httpResponse, body) {

        	console.log(arguments);

        	body = JSON.parse(body);

            assert.equal(err, null);
            assert.equal(httpResponse.statusCode, 200);
            assert.equal(body.title, testModelObject.title);
            assert.equal(body.description, testModelObject.description);

            done();

        });

    });



});
