var assert = require("assert");
var express = require('express');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var request = require('request');
var bodyParser = require('body-parser');


/******************
 * Test Object
 ******************/
var getTestObject = function() {
    return {
        date: new Date(),
        name: 'name',
        number: 18
    }
};


before(function(done) {


    /******************
     * Creating test schema and testing object
     ******************/
    var testSchema = new Schema({
        date: {
            type: Date,
            required: true
        },
        name: String,
        number: Number
    });

    // Adding schema to mongoose
    testModel = mongoose.model('Test', testSchema);

    // Getting test object
    testObject = getTestObject();

    // Creating express application
    var app = express();

    // Body (JSON) parsing middleware
    app.use(bodyParser.json());

    app.use('/api/', require('./../lib/index'));

    /******************
     * Connecting to mongo and starting server
     ******************/
    mongoose.connect("mongodb://localhost:27017/test", function() {

        console.log('Mongo connected');

        app.listen(3000, function() {

            console.log('Server started');

            // Removing data from test table
            mongoose.connection.collections['tests'].drop(function(err) {
                
                done();

            });

        });

    });

});


var url = 'http://localhost:3000/api/tests';
var testObject = {};
var testModelId = '';


describe('Testing API', function() {

    it('Creating model', function(done) {

        request.post({
            url: url,
            json: testObject
        }, function(err, httpResponse, body) {

            assert.equal(err, null);
            assert.equal(httpResponse.statusCode, 200);
            assert.equal(body.name, testObject.name);
            assert.equal(body.number, testObject.number);

            testModelId = body._id;

            // TODO: check assert of the date 
            // assert.equal(body.date, testObject.date);

            done();

        });

    });


    it('Getting single model', function(done) {

        request.get({

            uri: url + '/' + testModelId

        }, function(err, httpResponse, body) {

            body = JSON.parse(body);

            assert.equal(err, null);
            assert.equal(httpResponse.statusCode, 200);
            assert.equal(body.name, testObject.name);
            assert.equal(body.number, testObject.number);

            done();

        });

    });


    it('Updating model', function(done) {

        testObject.name = 'name-update';
        testObject.number = 19;

        request.put({

            uri: url + '/' + testModelId,
            json: testObject

        }, function(err, httpResponse, body) {

            assert.equal(httpResponse.statusCode, 200);

            request.get({

                uri: url + '/' + testModelId

            }, function(err, httpResponse, body) {

                body = JSON.parse(body);

                assert.equal(err, null);
                assert.equal(httpResponse.statusCode, 200);
                assert.equal(body.name, testObject.name);
                assert.equal(body.number, testObject.number);

                done();

            });

        });

    });

    it('Deleteng model', function(done) {

        request.del({
            uri: url + '/' + testModelId
        }, function(err, httpResponse, body) {

            assert.equal(httpResponse.statusCode, 200);

            request.get({
                uri: url + '/' + testModelId
            }, function(err, httpResponse, body) {

                assert.equal(body, 'null');
                assert.equal(err, null);
                assert.equal(httpResponse.statusCode, 200);

                done();

            });

        });
    });

});
