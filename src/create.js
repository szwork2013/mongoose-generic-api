'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			
			console.log('Create request');
			console.log(req.body);
			console.log('req.body');

			Model.create(req.body, function (err, model) {
				
				res.json(model);

			});

		}

	}

}
