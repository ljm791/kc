import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Message = {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
};

type Props = {
  socket: Socket;
  channelId: string;
};

export default function Chat({ socket, channelId }: Props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);

  // ✅ 채널 입장 시 메시지 불러오기
  useEffect(() => {
    fetch(`http://localhost:4000/messages/${channelId}`)
      .then((res) => res.json())
      .then((data) => setChat(data))
      .catch((err) => {
        console.error("메시지 불러오기 실패:", err);
      });

    // ✅ 소켓 수신 설정
    const handleMessage = (msg: Message) => {
      setChat((prev) => [...prev, msg]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [channelId, socket]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { channelId, message });
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        {chat.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>전송</button>
    </div>
  );
}
