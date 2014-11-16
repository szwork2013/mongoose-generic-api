'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			
			Model.findOne({ '_id': req.params.id }).exec(function (err, data) {
	        
		        res.json(data);

			});

		}

	};

};