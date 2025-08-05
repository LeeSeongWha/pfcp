import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function ChatPage() {
  const { vcNo } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`/rest/online/chat/${vcNo}`).then((res) => {
      setMessages(res.data);
    });
  }, [vcNo]);

  const handleSend = async () => {
    await axios.post("/rest/online/chat", {
      vcNo,
      senderNo: 1,
      messageType: "TEXT",
      messageContent: input,
      isPrivate: "N",
      isDelete: "N",
      messageCreatedAt: new Date(),
    });
    setInput("");
    const res = await axios.get(`/rest/online/chat/${vcNo}`);
    setMessages(res.data);
  };

  return (
    <div>
      <h2>채팅</h2>
      <div>
        {messages.map((m) => (
          <div key={m.messageNo}>
            <strong>{m.senderName}</strong>: {m.messageContent}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>보내기</button>
    </div>
  );
}

export default ChatPage;
