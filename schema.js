var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// -- USER --------------------
// ----------------------------
var userSchema = new Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
        private: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    hourUsage: {
        type: Number,
        default: 0
    }

});

var User = mongoose.model('User', userSchema);


// -- ROLE --------------------
// ----------------------------
var roleSchema = new Schema({
    name: {
        type: String
    }
});

var Role = mongoose.model('Role', roleSchema);

