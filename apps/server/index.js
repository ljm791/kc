require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./src/db");
const setupSocket = require("./src/socket");
const Channel = require("./src/model/channel");
const Message = require("./src/model/message");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/channels", async (req, res) => {
  const channels = await Channel.find({});
  res.json(channels);
});

app.post("/channels", async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "채널 이름은 필수입니다." });
  }

  const existing = await Channel.findOne({ name });
  if (existing) {
    return res.status(409).json({ error: "이미 존재하는 채널입니다." });
  }

  const newChannel = new Channel({ name });
  await newChannel.save();
  res.status(201).json(newChannel);
});

// 채널별 메시지 불러오기
app.get("/messages/:channelId", async (req, res) => {
  const { channelId } = req.params;

  try {
    const messages = await Message.find({ channelId })
      .sort({ createdAt: 1 }); // 오래된 순으로 정렬
    res.json(messages);
  } catch (err) {
    console.error("❌ 메시지 불러오기 실패:", err);
    res.status(500).json({ error: "서버 에러" });
  }
});

// DB 연결
connectDB();

// 소켓 설정
setupSocket(io);

// 서버 시작
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
