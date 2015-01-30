var Tweet = require('../models/Tweet');

var save = function (tweet) {

    var tweet = new Tweet({
        id_str: tweet.id_str,
        text: tweet.text,
        user: {
            id_str: tweet.user.id_str,
            name: tweet.user.name,
            screen_name: tweet.user.screen_name
        },
        entities: {
            media_url: tweet.entities.media[0].media_url
        }
    });

    tweet.save(function(error, tweet) {
        if (error) {
            console.error('[Snapkite] Failed to save tweet. Error: ' + error);
        }
    });
};

module.exports = {
  save: save
};