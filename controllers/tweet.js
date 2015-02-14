var Tweet = require('../models/Tweet');

var save = function (tweet) {
  var tweet = new Tweet({
    id: tweet.id,
    text: tweet.text,
    user: {
      id: tweet.user.id
    },
    media: tweet.media
  });

  tweet.save(function(error, tweet) {
    if (error) {
      console.error('[Snapkite] Failed to save tweet: ' + error);
    }
  });
};

module.exports = {
  save: save
};
