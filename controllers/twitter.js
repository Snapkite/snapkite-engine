var Twitter = require('node-tweet-stream');

//
// Tweet filters
//
var hasMobilePhoto = require('../filters/has-mobile-photo');
var isAdultContent = require('../filters/is-adult-content/is-adult-content');
var isRetweet = require('../filters/is-retweet');
var isMobileSource = require('../filters/is-mobile-source');
var hasGeoCoordinates = require('../filters/has-geo-coordinates');

var isValidTweet = function (tweet) {
  return (
      hasMobilePhoto(tweet)
      && !isAdultContent(tweet)
      && !isRetweet(tweet)
      && isMobileSource(tweet)
      && hasGeoCoordinates(tweet)
  );
};

module.exports = function (config, handleTweet) {
  var ENVIRONMENT = config.environment;
  var TWITTER_CONSUMER_KEY = config.twitter[ENVIRONMENT].consumerKey;
  var TWITTER_CONSUMER_SECRET = config.twitter[ENVIRONMENT].consumerSecret;
  var TWITTER_ACCESS_TOKEN_KEY = config.twitter[ENVIRONMENT].accessTokenKey;
  var TWITTER_ACCESS_TOKEN_SECRET = config.twitter[ENVIRONMENT].accessTokenSecret;
  var TWITTER_PICTURE_TRACK_KEYWORD = "pic twitter com";

  var keywords = [TWITTER_PICTURE_TRACK_KEYWORD, config.application.trackKeywords].join(' ');

  var twitter = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    token: TWITTER_ACCESS_TOKEN_KEY,
    token_secret: TWITTER_ACCESS_TOKEN_SECRET
  });

  console.log('[Snapkite] Twitter config:');
  console.dir(config.twitter);

  twitter.on('tweet', function (tweet) {
    if (isValidTweet(tweet)) {
      handleTweet(tweet);
    }
  });

  twitter.on('error', function (error) {
    console.error('[Snapkite][Error] ' + error);
  })

  twitter.track(keywords);
};