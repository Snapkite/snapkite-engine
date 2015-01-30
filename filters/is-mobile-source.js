var isiPhone = function (tweet) {
  return /iPhone/i.test(tweet.source);
};

var isAndroid = function (tweet) {
  return /Android/i.test(tweet.source);
};

module.exports = function (tweet) {
  return (isiPhone(tweet) || isAndroid(tweet));
};