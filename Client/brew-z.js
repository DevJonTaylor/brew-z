const Client = require('../Classes/Client');

let client = new Client();

client.connect(() => {
  client.emit('cray', 'Sup!');
});
