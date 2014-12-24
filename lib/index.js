var mongoose = require('mongoose'),
    express = require('express'),
    _ = require('underscore'),
    router = express.Router();


var clientSchemaData = {
    url: '/api/',
    models: []
};

var notPublicPaths = [
    '__v',
    'password',
    'salt',
    'hashed_password',
    'resetPasswordToken',
    'resetPasswordExpires',
    'providerData',
    'additionalProvidersData'
];

var getPaths = function(paths) {

    var _paths = [];

    for (var prop in paths) {

        var path = paths[prop];

        if (!_.contains(notPublicPaths, prop)) {

            _paths.push(path);

        }

    }

    return _paths;

}

for (var name in mongoose.models) {

    var model = mongoose.models[name];
    var Model = mongoose.model(model.modelName);

    var find = require('./find')(Model),
        findOne = require('./findOne')(Model),
        create = require('./create')(Model),
        update = require('./update')(Model),
        del = require('./delete')(Model);

    router.get('/' + model.collection.name, find.request);
    router.post('/' + model.collection.name, create.request);
    router.get('/' + model.collection.name + '/:id', findOne.request);
    router.put('/' + model.collection.name + '/:id', update.request)
    router.delete('/' + model.collection.name + '/:id', del.request);

    var paths = getPaths(model.schema.paths);

    clientSchemaData.models.push({
        name: model.modelName,
        collection: model.collection.name,
        paths: paths
    });

    router.schema = clientSchemaData;

}

router.get('/schema', function(req, res) {

    res.json(clientSchemaData);

});



module.exports = router;
