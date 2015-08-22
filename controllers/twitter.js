var Twitter = require('node-tweet-stream');

var MINIMUM_IMAGE_WIDTH = 300;
var MINIMUM_IMAGE_HEIGHT = 300;

function isLargeEnoughMedia(media) {
  if (
    media.sizes
    && media.sizes.medium
    && media.sizes.medium.w
    && media.sizes.medium.w >= MINIMUM_IMAGE_WIDTH
    && media.sizes.medium.h
    && media.sizes.medium.h >= MINIMUM_IMAGE_HEIGHT
  ) {
    return true;
  }

  return false;
}

function isValidMedia(tweet) {
  if (
    tweet.entities
    && tweet.entities.media
    && tweet.entities.media[0]
    && tweet.entities.media[0].type
    && tweet.entities.media[0].type === "photo"
    && isLargeEnoughMedia(tweet.entities.media[0])
  ) {
    return true;
  }

  return false;
}

var isValidTweet = function (tweet, config) {

  //
  // Check that track keywords are part of tweet's text
  //
  var trackKeywords = config.application.trackKeywords.replace(/[, ]/g, '|');
  var trackKeywordsRegex = new RegExp(trackKeywords, 'gim');

  if (! tweet.text.match(trackKeywordsRegex)) {
    return false;
  }

  //
  // Check that exclude keywords are NOT part of tweet's text
  //
  var excludeKeywords = config.application.excludeKeywords.replace(/[, ]/g, '|');
  var excludeKeywordsRegex = new RegExp(excludeKeywords, 'gim');

  if (excludeKeywords.length && tweet.text.match(excludeKeywordsRegex)) {
    return false;
  }

  if (! isValidMedia(tweet)) {
    return false;
  }

  var validTweet = true;

  // Validate tweet with filters
  config.application.filters.forEach(function (filter) {
    if (validTweet) {
      validTweet = require('../filters/' + filter).isValid(tweet);
    }
  });

  return validTweet;
};

module.exports = function (config, handleTweet) {
  var TWITTER_CONSUMER_KEY = config.twitter.api.consumerKey;
  var TWITTER_CONSUMER_SECRET = config.twitter.api.consumerSecret;
  var TWITTER_ACCESS_TOKEN_KEY = config.twitter.api.accessTokenKey;
  var TWITTER_ACCESS_TOKEN_SECRET = config.twitter.api.accessTokenSecret;
  var TWITTER_PICTURE_TRACK_KEYWORD = "pic twitter com";

  var keywords = config.application.trackKeywords.split(',').map(function (keyword) {
    return (TWITTER_PICTURE_TRACK_KEYWORD + ' ' + keyword);
  });

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
