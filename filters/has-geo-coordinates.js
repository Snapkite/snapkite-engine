module.exports = function (tweet) {
  if (
    tweet.geo
    && tweet.geo.coordinates
    && tweet.geo.coordinates[0]
    && tweet.geo.coordinates[1]
  ) {
    return true;
  }

  return false;
};