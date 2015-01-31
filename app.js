var SNAPKITE_CONFIG = require('./config.json');

require('./controllers/socket')(SNAPKITE_CONFIG.socket);
require('./controllers/database')(SNAPKITE_CONFIG.database);
require('./controllers/twitter')(SNAPKITE_CONFIG, function (tweet) {

  if (SNAPKITE_CONFIG.application.storeTweets) {
    require('./controllers/tweet').save(tweet);
  }

  if (SNAPKITE_CONFIG.application.pushTweets) {
  	global.io.emit('tweet', tweet);
  }
});