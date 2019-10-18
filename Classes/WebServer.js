const net = require('net');
const Socket = require('./Socket');

/**
 * @define  This class will allow the connection
 * @since   0.0.1
 * @type    {WebServer}
 */
module.exports = class WebServer {
  constructor({ port = 3000, ip = '0.0.0.0', displayListeningMessage=true } = {}) {
    this.port = port;
    this.ip = ip;
    this.server = null;
    this.sockets = {};
    this.displayMessage = displayListeningMessage;
  }

  listen(callback) {
    let server = net.createServer();
    server.listen(this.port, this.ip);

    if(this.displayMessage)
      console.log(`Listening on port ${this.port} @ ${this.ip}`);

    server.on('connection', sock => {
      let socket = new Socket(sock);
      this.sockets[socket.id] = socket;
      socket.on('close', () => delete this.sockets[socket.id]);
      callback(socket);
    });
  }
};
