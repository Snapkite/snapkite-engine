module.exports = function (config) {

  var server = require('http').createServer();

  global.io = require('socket.io')(server);
  global.io.on('connection', function (socketConnection) {
    console.log('[Snapkite][Socket] Client connected');

    socketConnection.on('disconnect', function () {
      console.log('[Snapkite][Socket] Client disconnected');
    });
  });

  server.listen(config.port, function () {
    console.log('[Snapkite][Socket] Listening on port ' + config.port);
  });
};