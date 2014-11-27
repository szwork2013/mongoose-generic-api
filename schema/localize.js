var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 *  LOCALIZE ---------------------------------------------------------------------
 */
var localizeSchema = new Schema({
	key: {
		type: String,
		required: true,
		trim: true
	},
	value: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String
	},
	language: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Language'
	}
});

mongoose.model('Localize', localizeSchema);
