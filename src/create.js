'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			
			Model.create(req.body, function (err, model) {
				
				res.json(model);

			});

		}

	}

}
