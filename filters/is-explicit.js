var ADULT_KEYWORDS = [
	'penis',
	'cock',
	'jerk',
	'dick',
	'gay',
	'shemale',
	'anal',
	'fisting',
	'porn',
	'xxx',
	'fuck'
];

var ADULT_KEYWORDS_REGEX = new RegExp(ADULT_KEYWORDS.join('|'), 'gim');

var isExplicitText = function (tweet) {
	return ADULT_KEYWORDS_REGEX.test(tweet.text);
};

var isExplicitName = function (tweet) {
	return ADULT_KEYWORDS_REGEX.test(tweet.user.name);
};

var isExplicitLocation = function (tweet) {
	return ADULT_KEYWORDS_REGEX.test(tweet.user.location);
};

var isExplicitDescription = function (tweet) {
	return ADULT_KEYWORDS_REGEX.test(tweet.user.description);
};

module.exports = function (tweet) {
  return tweet.possibly_sensitive
      || isExplicitText(tweet)
      || isExplicitName(tweet)
      || isExplicitLocation(tweet)
      || isExplicitDescription(tweet);
};