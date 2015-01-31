var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
	id_str: {type: String, required: true},
	text: {type: String, required: true},
	user: {
		id_str: {type: String, required: true},
		name: {type: String, required: true},
		screen_name: {type: String, required: true}
	},
	entities: {
		media_url: {type: String, required: true}
	}
});

module.exports = mongoose.model('Tweet', tweetSchema);