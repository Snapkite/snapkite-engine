var Tweet = require('../models/Tweet');

var save = function (tweet) {

  // TODO: validate tweet

  var tweet = new Tweet(tweet);

  tweet.save(function(error, tweet) {
    if (error) {
      console.error('[Snapkite] Failed to save tweet: ' + error);
    }
  });
};

module.exports = {
  save: save
};
