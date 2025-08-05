import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function EclassroomPage() {
  const { vcNo } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    axios.get(`/rest/online/participants/${vcNo}`).then((res) => {
      setParticipants(res.data);
    });
  }, [vcNo]);

  return (
    <div>
      <h2>강의실 참여자</h2>
      <ul>
        {participants.map((p) => (
          <li key={p.participantNo}>
            {p.userName} ({p.participantRole})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EclassroomPage;
