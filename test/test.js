var assert = require("assert");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');


describe('Generic API', function() {

    before(function(done) {

        var testSchema = new Schema({
            date: {
                type: Date,
                required: true
            },
            title: String,
            description: String
        });

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

            var testModel = {
                date: new Date,
                title: 'title',
                description: 'description'
            };

            request.post({
                url: 'http://localhost:3000/api/tests',
                json: testModel
            }, function(err, httpResponse, body) {

                assert.equal(err, null);
                assert.equal(httpResponse.statusCode, 200);
                assert.equal(body.title, testModel.title);
                assert.equal(body.description, testModel.description);
                assert.equal(body.date, testModel.date);

                done();

            });

        });

    });

});
