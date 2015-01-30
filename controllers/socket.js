module.exports = function (config) {

  var uuid = require('node-uuid');
  var server = require('http').createServer();

  global.io = require('socket.io')(server);
  global.io.on('connection', function (socketConnection) {
    console.log('[Snapkite][Socket] Client connected');

    socketConnection.on('disconnect', function () {
      console.log('[Snapkite][Socket] Client disconnected');
    });

    // socketConnection.on('event', function (data) {
    //   console.log('[Snapkite][Socket] Event');
    // });

    // socketConnection.on('get-room-id', function() {
    //   console.log('[Snapkite][Socket] Client asked for room id');

    //   var roomId = uuid.v4();

    //   socketConnection.join(roomId);

    //   console.log('[Snapkite][Socket] Emitting message with room id ' + roomId);

    //   socketConnection.emit('room-id', roomId);
    // });

  });

  server.listen(config.port, function () {
    console.log('[Snapkite][Socket] Listening on port ' + config.port);
  });
};