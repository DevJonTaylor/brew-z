const uuid = require('uuid/v4');

module.exports = class Socket {
  constructor(socket) {
    this.socket = socket;
    this.id = uuid();
    socket.on('data', data => {
      let json = JSON.parse(data);
      this.socket.emit(json.emit, ...json.args);
    })
  }

  on(name, listener) {
    this.socket.on(name, listener);
  }

  once(name, listener) {
    this.socket.once(name, listener);
  }

  emit(emit, ...args) {
    this.socket.write(JSON.stringify({ emit, args }))
  }
};
