function removeImageUrlFromText(text) {
  return text.replace(/http:\/\/t.co\/[a-zA-Z0-9]+/, '');
}

function simplify(tweet) {

  //
  // Clean tweet's format
  //
  var simpleTweet = {
    text: removeImageUrlFromText(tweet.text),
    id: tweet.id_str,
    user: {
      id: tweet.user.id_str
    },
    media: tweet.entities.media.map(function (media) {
      return {
        url: media.media_url
      };
    }),
    lang: tweet.lang
  };

  return simpleTweet;
}

function tokenize(text) {
  return text.split(' ');
}

function wordify(keyword) {
  return keyword.replace(/[^a-zA-Z]+/g, '');
}

module.exports = {
  simplify: simplify,
  tokenize: tokenize,
  wordify: wordify
};
