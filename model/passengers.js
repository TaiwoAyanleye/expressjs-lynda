var mongoose = require('mongoose');
var passengerSchema = new mongoose.Schema({
	name: String,
	ticket_id: Array
});
mongoose.model('Passenger', passengerSchema);