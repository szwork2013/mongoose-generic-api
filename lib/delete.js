'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			

			Model.findById(req.params.id).exec(function (err, model) {
	        	
				model.remove();

		        res.json(true);

			});

		}

	}

}
