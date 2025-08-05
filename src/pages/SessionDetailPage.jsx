import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function SessionDetailPage() {
  const { sessionNo } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    axios.get(`/api/online/session/${sessionNo}`).then((res) => {
      setSession(res.data);
    });
  }, [sessionNo]);

  if (!session) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>세션 상세</h2>
      <p>제목: {session.ocTitle}</p>
      <p>일정: {session.scheduledAt}</p>
      <p>참여 최대 인원: {session.maxParticipants}</p>
    </div>
  );
}

export default SessionDetailPage;
