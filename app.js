function simplifyTweet(tweet) {

  //
  // Clean tweet's format
  //
  var simpleTweet = {
    text: tweet.text,
    id: tweet.id_str,
    user: {
      id: tweet.user.id_str
    },
    media: tweet.entities.media.map(function (media) {
      return {
        url: media.media_url
      };
    })
  };

  return simpleTweet;
}

var SNAPKITE_CONFIG = require('./config.json');

if (SNAPKITE_CONFIG.application.pushTweets) {
  require('./controllers/socket')(SNAPKITE_CONFIG.socket);
}

if (SNAPKITE_CONFIG.application.storeTweets) {
  require('./controllers/database')(SNAPKITE_CONFIG.database);
}

require('./controllers/twitter')(SNAPKITE_CONFIG, function (tweet) {

  tweet = simplifyTweet(tweet);

  if (SNAPKITE_CONFIG.application.storeTweets) {
    require('./controllers/tweet').save(tweet);
  }

  if (SNAPKITE_CONFIG.application.pushTweets) {
    global.io.emit('tweet', tweet);
  }
});
