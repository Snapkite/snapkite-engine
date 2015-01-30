var Twitter = require('twitter');

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

  var twitter = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token_key: TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
  });

  console.log('[Snapkite] Twitter config:');
  console.dir(config.twitter);

  var track = [TWITTER_PICTURE_TRACK_KEYWORD, config.application.trackKeywords].join(' ');

  twitter.stream('statuses/filter', {track: track}, function (stream) {
    stream.on('data', function (tweet) {

      if (isValidTweet(tweet)) {
        handleTweet(tweet);
      }

    });

    stream.on('error', function (error) {
      throw error;
    });
  });
};