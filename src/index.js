var mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

for (var name in mongoose.models) {


    var model = mongoose.models[name];
    var Model = mongoose.model(model.modelName);

    var find = require('./find')(Model),
    	findOne = require('./findOne')(Model),
    	create = require('./create')(Model),
    	update = require('./update')(Model),
    	del = require('./delete')(Model);

    console.log('Creating API for ' + model.collection.name);

    router.get('/' + model.collection.name, find.request);
    router.post('/' + model.collection.name, create.request);
    router.get('/' + model.collection.name + '/:id', findOne.request);
    router.put('/' + model.collection.name + '/:id', update.request)
    router.delete('/' + model.collection.name + '/:id', del.request);


}


module.exports = router;
