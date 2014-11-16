'use strict';



module.exports = function (Model) {
	
	return {

		request: function (req, res, next) {
			
			res.json(true);

		}

	}

}
