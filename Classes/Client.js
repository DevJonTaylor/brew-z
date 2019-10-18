const net = require('net');

module.exports = class Client {
  constructor({port = 3000, ip = '0.0.0.0'} = {}) {
    this.ip = ip;
    this.port = port;
    this.client = new net.Socket();
    this.isConnected = false;

    this.client.on('data', this.convertToEmit.bind(this));
  }

  connect(callback) {
    this.client.connect(this.port, this.ip, () => {
      this.isConnected = true;
      this.client.on('close', () => this.isConnected = false);
      callback.bind(this)();
    })
  }

  convertToEmit(data) {
    let json = JSON.parse(data);
    this.client.emit(json.emit, ...json.args);
  }

  on(name, listener) {
    this.client.on(name, listener);
  }

  once(name, listener) {
    this.client.once(name, listener);
  }

  emit(emit, ...args) {
    this.client.write(JSON.stringify({ emit, args }));
  }
};
