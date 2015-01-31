var createMongoUrl = function (configuration) {
  configuration.hostname = (configuration.hostname || '127.0.0.1');
  configuration.port = (configuration.port || 27017);
  configuration.name = (configuration.name || 'snapkite');

  if (configuration.username && configuration.password) {

    return ["mongodb://",
            configuration.username,
            ":",
            configuration.password,
            "@",
            configuration.hostname,
            ":",
            configuration.port,
            "/",
            configuration.name].join('');
  
  } else {

    return ["mongodb://",
            configuration.hostname,
            ":",
            configuration.port,
            "/",
            configuration.name].join('');
  }
};

var init = function (config) {

  var mongoUrl = createMongoUrl(config);

  global.mongoose = require('mongoose');
  global.mongoose.connect(mongoUrl);
  global.mongoose.connection
    .once('open', function () {
      console.log('[Snapkite][Database] Connected');
    })
    .on('error', function () {
      console.error('[Snapkite][Database][Error] Make sure MongoDB is running');
    });
};

module.exports = init;