var textHasImageUrl = function (tweet) {
  return (tweet.text.indexOf(tweet.entities.media[0].url) > -1);
};

var isMobileMediaSize = function (tweet) {
  return (
    tweet.entities.media[0].sizes.medium.w > 599
    && tweet.entities.media[0].sizes.medium.h > 798
    && tweet.entities.media[0].sizes.medium.h < 820
  );
};

module.exports = function (tweet) {
  return (
    tweet.entities
    && tweet.entities.media
    && tweet.entities.media[0].type === "photo"
    && tweet.source !== "web"
    && textHasImageUrl(tweet)
    && isMobileMediaSize(tweet)
  );
};