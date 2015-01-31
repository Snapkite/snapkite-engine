module.exports = function (tweet) {
  if (typeof tweet.text !== 'undefined') {
    if (
      tweet.entities
      && tweet.entities.media
      && tweet.entities.media[0]
      && tweet.entities.media[0].url
    ) {

      var textWithoutMediaUrl = tweet.text.replace(tweet.entities.media[0].url, '');

      if (textWithoutMediaUrl.length > 0) {
        return true;
      }
    }
  }

  return false;
};