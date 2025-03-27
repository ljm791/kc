const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: String, // 추후 유저 기능 연결 가능
    default: "anonymous",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
