var mongoose = require('mongoose');

var COLLECTION_NAME = 'keyword';

var keywordSchema = new mongoose.Schema({
  data: {type: mongoose.Schema.Types.Mixed, required: true}
}, { collection: COLLECTION_NAME });

module.exports = mongoose.model('Keyword', keywordSchema);
