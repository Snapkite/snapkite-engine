var mongoose = require('mongoose');

var COLLECTION_NAME = 'tweet';

var tweetSchema = new mongoose.Schema({
  id: {type: String, required: true},
  text: {type: String},
  user: {
    id: {type: String, required: true}
  },
  media: [{
    url: {type: String, required: true}
  }],
  coordinates: {
    latitude: {type: String, required: false},
    longitude: {type: String, required: false}
  },
  date_updated: {type: Date, default: (new Date())}
}, { collection: COLLECTION_NAME });

module.exports = mongoose.model('Tweet', tweetSchema);
