'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			
			Model.find(req.body).exec(function (err, data) {
	        
		        res.json(data);

			});

		}

	}

}
