const Message = require("./model/message");

module.exports = function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);

    socket.on("joinChannel", (channelId) => {
      socket.join(channelId);
      console.log(`[+] ${socket.id} joined ${channelId}`);
    });

    socket.on("leaveChannel", (channelId) => {
      socket.leave(channelId);
      console.log(`[-] ${socket.id} left ${channelId}`);
    });

    socket.on("sendMessage", async ({ channelId, message }) => {
      console.log(`📨 [${channelId}] ${message}`);

      // ✅ DB에 메시지 저장
      const saved = await Message.create({
        channelId,
        content: message,
        sender: "anonymous", // 나중에 유저 닉네임으로 교체 가능
      });

      // 채널에 브로드캐스트
      io.to(channelId).emit("receiveMessage", saved);
    });
  });
};
