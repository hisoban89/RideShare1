// Driver model
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Driver = new Schema({
	driverfname: String,
	driverlname: String,
	driverusername: String,
	driverpassword: String
});

Driver.plugin(passportLocalMongoose);


module.exports = mongoose.model('drivers', Driver);