import { useState } from "react";
import { io, Socket } from "socket.io-client";
import Chat from "./Chat";
import ChannelList from "./ChannelList";

const socket: Socket = io("http://localhost:4000");

function App() {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);

  const joinChannel = (channelId: string) => {
    if (currentChannel) {
      socket.emit("leaveChannel", currentChannel);
    }
    socket.emit("joinChannel", channelId);
    setCurrentChannel(channelId);
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <h2>채널 목록</h2>
        <ChannelList joinChannel={joinChannel} />
      </div>

      <div>
        <h2>채팅</h2>
        {currentChannel ? (
          <Chat socket={socket} channelId={currentChannel} />
        ) : (
          <p>채널을 선택하세요</p>
        )}
      </div>
    </div>
  );
}

export default App;
