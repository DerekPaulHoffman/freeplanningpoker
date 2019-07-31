const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
    client.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
  client.on('chat message', (newMessage) => {
    client.emit('chat message', newMessage);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);