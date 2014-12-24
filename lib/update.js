'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
	
			Model.findByIdAndUpdate(req.params.id, req.body, function (err, model) {
			
				res.send(model);
			
			});

		}

	}

}
