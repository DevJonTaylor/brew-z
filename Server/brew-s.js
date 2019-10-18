const WebServer = require('../Classes/WebServer');
const server = new WebServer();

server.listen(function(socket) {
  console.log(`Socket ID: ${socket.id} Connected Successfully`);
});
