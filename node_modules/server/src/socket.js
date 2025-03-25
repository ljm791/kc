// apps/server/src/socket.js
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on('sendMessage', (message) => {
      console.log(`[${message.user}] ${message.text}`);
      io.emit('receiveMessage', message); // 전체에게 전송
    });

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};
