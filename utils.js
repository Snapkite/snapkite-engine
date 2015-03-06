function removeImageUrlFromText(text) {
  return text.replace(/http:\/\/t.co\/[a-zA-Z0-9]+/, '');
}

function simplify(tweet) {
  //
  // Clean tweet's format
  // https://dev.twitter.com/overview/api/tweets
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
    coordinates: {
      latitude: null,
      longitude: null
    }
  };

  if (tweet.coordinates) {
    simpleTweet.coordinates.latitude = tweet.coordinates.coordinates[1];
    simpleTweet.coordinates.longitude = tweet.coordinates.coordinates[0];
  }

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
