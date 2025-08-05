import { useState } from "react";
import { utils } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

export const useSessionForm = () => {
  const { user } = useAuth();
  const [session, setSession] = useState({
    // 입력 데이터
    type: "",
    th: 20,
    title: "",
    startDate: utils.getKoreanDateTime(),
    attendenceRequired: "N",
    userNo: user.username,
    lecNo: "",

    // 응답 데이터
    zoomMeetingId: null,
    joinUrl: null,
    password: null,
    hostEmail: null,
    timezone: null,
    createdAt: null,
    agenda: null,
    start_time: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateSession = (updates) => {
    setSession((prev) => ({ ...prev, ...updates }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      updateSession({ [name]: checked ? "Y" : "N" });
    } else {
      updateSession({ [name]: value });
    }
  };

  const resetForm = () => {
    setSession((prev) => ({
      ...prev,
      type: "",
      title: "",
      startDate: utils.getKoreanDateTime(),
      attendenceRequired: "N",
      // 응답 데이터 초기화
      zoomMeetingId: null,
      joinUrl: null,
      password: null,
      hostEmail: null,
      timezone: null,
      createdAt: null,
      agenda: null,
      start_time: null,
    }));
  };

  return {
    session,
    isLoading,
    setSession,
    setIsLoading,
    updateSession,
    handleInputChange,
    resetForm,
  };
};
