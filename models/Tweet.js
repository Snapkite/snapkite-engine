var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  id_str: {type: String, required: true},
  text: {type: String, required: true},
  user: {
    id_str: {type: String, required: true},
    name: {type: String},
    screen_name: {type: String}
  },
  entities: {
    media: [{
      id_str: {type: String, required: true},
      media_url: {type: String, required: true}
    }]
  }
});

module.exports = mongoose.model('Tweet', tweetSchema);