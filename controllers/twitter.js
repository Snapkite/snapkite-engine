var Twitter = require('node-tweet-stream');

//
// Tweet filters
//
var hasMobilePhoto = require('../filters/has-mobile-photo');
var isAdultContent = require('../filters/is-adult-content/is-adult-content');
var isRetweet = require('../filters/is-retweet');
var isMobileSource = require('../filters/is-mobile-source');
var hasGeoCoordinates = require('../filters/has-geo-coordinates');
var hasText = require('../filters/has-text');

var isValidTweet = function (tweet, config) {
  var validTweet = true;

  if (validTweet && config.twitter.filters.isAdultContent) {
    validTweet = (!isAdultContent(tweet));
  }

  if (validTweet && config.twitter.filters.hasGeoCoordinates) {
    validTweet = hasGeoCoordinates(tweet);
  }  

  if (validTweet && config.twitter.filters.hasMobilePhoto) {
    validTweet = hasMobilePhoto(tweet);
  } 

  if (validTweet && config.twitter.filters.isMobileSource) {
    validTweet = isMobileSource(tweet);
  } 

  if (validTweet && config.twitter.filters.isRetweet) {
    validTweet = (!isRetweet(tweet));
  }

  if (validTweet && config.twitter.filters.hasText) {
    validTweet = (hasText(tweet));
  }
  
  return validTweet;
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

  twitter.on('tweet', function (tweet) {
    if (isValidTweet(tweet, config)) {
      handleTweet(tweet);
    }
  });

  twitter.on('error', function (error) {
    console.error('[Snapkite][Error] ' + error);
  })

  twitter.track(keywords);
};