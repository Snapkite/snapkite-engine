var mongoose = require('mongoose');

var COLLECTION_NAME = 'tweet';

var tweetSchema = new mongoose.Schema({
  id: {type: String, required: true},
  text: {type: String, required: true},
  user: {
    id: {type: String, required: true}
  },
  media: [{
    url: {type: String, required: true}
  }]
}, { collection: COLLECTION_NAME });

module.exports = mongoose.model('Tweet', tweetSchema);
