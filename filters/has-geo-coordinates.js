module.exports = function (tweet) {
  return (
    tweet.geo
    && tweet.geo.coordinates
    && tweet.geo.coordinates[0]
    && tweet.geo.coordinates[1]
  );
};