// booking model
var mongoose              = require('mongoose');
var Schema                = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Booking = new Schema({
	booking: String
});

Booking.plugin(passportLocalMongoose);


module.exports = mongoose.model('bookings', Booking);