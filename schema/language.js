var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Language = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    codeISO: {
        type: String,
        required: true,
        trim: true
    },
    direction: {
        type: String,
        required: true,
        trim: true
    },
    nativeName: {
        type: String,
        required: true,
        trim: true
    }
});

mongoose.model('Language', Language);
