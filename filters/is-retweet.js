module.exports = function (tweet) {
  return (tweet.text.indexOf("RT") > -1);
};