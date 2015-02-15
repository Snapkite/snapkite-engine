var Keyword = require('../models/Keyword');

var save = function (keyword, trackKeywords, callback) {

  // Ignore case
  keyword = keyword.toLowerCase();

  // Do not store track keywords
  if (trackKeywords.indexOf(keyword) > -1) {
    return;
  }

  // Remove everything else apart from words
  keyword = require('../utils').wordify(keyword);

  // Do not store words that are shorter than 2 characters
  // and longer than 20 characters.
  if (keyword.length < 3 || keyword.length > 20) {
    return;
  }

  Keyword.findOne(function (error, keywords) {
    if (error) {
      console.error('[Snapkite] Failed to find stats: ' + error);
      return;
    }

    if (typeof keywords.data[keyword] === 'undefined') {
      keywords.data[keyword] = 1;
    } else {
      var currentKeywordCounter = keywords.data[keyword];
      keywords.data[keyword] = currentKeywordCounter + 1;
    }

    keywords.markModified('data.' + keyword);

    keywords.save(function(error, keywords) {
      if (error) {
        console.error('[Snapkite] Failed to save stats: ' + error);
        return;
      }

      callback(keywords.data);
    });
  });
};

module.exports = {
  save: save
};
