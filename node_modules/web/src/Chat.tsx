import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatBubble, Button } from "@kscord/ui";

// 타입 선언 (공용 타입 쓰는 경우엔 @kscord/types에서 import)
type Message = {
  user: string;
  text: string;
  timestamp: number;
};

const socket: Socket = io("http://localhost:4000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [nameSet, setNameSet] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", (msg: Message) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const msg: Message = {
        user: username,
        text: message,
        timestamp: Date.now(),
      };
      socket.emit("sendMessage", msg);
      setMessage("");
    }
  };

  // 이름 입력 창
  if (!nameSet) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter your name</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your name"
        />
        <button onClick={() => setNameSet(true)} disabled={!username.trim()}>
          Join Chat
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>KsCord Chat</h2>
      <div style={{ marginBottom: 16 }}>
        {chat.map((msg, idx) => (
          <ChatBubble key={idx} user={msg.user} text={msg.text} />
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
