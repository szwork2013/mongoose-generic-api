'use strict';



module.exports = function(Model) {

    return {

        request: function(req, res, next) {

            var query = Model.find(req.body);
            
            query.exec(function(err, data) {

                res.json(data);

            });

        }

    }

}
