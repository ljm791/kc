import { useEffect, useState } from "react";

type Channel = {
  _id: string;
  name: string;
};

type Props = {
  joinChannel: (channelId: string) => void;
};

export default function ChannelList({ joinChannel }: Props) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [newChannel, setNewChannel] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/channels")
      .then((res) => res.json())
      .then((data) => setChannels(data));
  }, []);

  const createChannel = () => {
    if (!newChannel.trim()) return;
  
    fetch("http://localhost:4000/channels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newChannel }),
    })
      .then(async (res) => {
        if (res.status === 409) {
          alert("이미 존재하는 채널입니다.");
          throw new Error("중복 채널");
        }
        if (!res.ok) {
          alert("채널 생성 실패");
          throw new Error("서버 오류");
        }
        return res.json();
      })
      .then((created) => {
        setChannels((prev) => [...prev, created]);
        setNewChannel("");
      })
      .catch((err) => {
        console.error("채널 생성 실패:", err);
      });
  };
    
  return (
    <div>
      <h3>채널 목록</h3>
      {channels.map((ch) => (
        <button key={ch._id} onClick={() => joinChannel(ch._id)}>
          #{ch.name}
        </button>
      ))}

      <div style={{ marginTop: 10 }}>
        <input
          value={newChannel}
          onChange={(e) => setNewChannel(e.target.value)}
          placeholder="새 채널 이름"
        />
        <button onClick={createChannel}>채널 생성</button>
      </div>
    </div>
  );
}
