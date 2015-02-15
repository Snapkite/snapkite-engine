var SNAPKITE_CONFIG = require('./config.json');

if (SNAPKITE_CONFIG.application.pushTweets) {
  require('./controllers/socket')(SNAPKITE_CONFIG.socket);
}

if (SNAPKITE_CONFIG.application.storeTweets) {
  require('./controllers/database')(SNAPKITE_CONFIG.database);
}

require('./controllers/twitter')(SNAPKITE_CONFIG, function (tweet) {

  var utils = require('./utils');

  tweet = utils.simplify(tweet);

  if (SNAPKITE_CONFIG.application.storeTweets) {
    require('./controllers/tweet').save(tweet);
  }

  if (SNAPKITE_CONFIG.application.storeKeywords) {
    utils.tokenize(tweet.text).forEach(function (token) {
      require('./controllers/keyword').save(token, SNAPKITE_CONFIG.application.trackKeywords.split(' '), function (keywords) {

        if (SNAPKITE_CONFIG.application.pushKeywords) {
          global.io.emit('keywords', tweet);
        }

      });
    });
  }

  if (SNAPKITE_CONFIG.application.pushTweets) {
    global.io.emit('tweet', tweet);
  }
});
