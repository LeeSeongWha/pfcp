import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_AXIOS_API_BASE_URL;

export const SESSION_TYPES = [
  { value: "LECTURE", label: "강의" },
  { value: "WEBINAR", label: "웨비나" },
  { value: "MEETING", label: "미팅" },
  { value: "DISCUSSION", label: "토론" },
  { value: "PRESENTATION", label: "발표" },
];

export const sessionService = {
  createZoomSession: async (sessionData) => {
    const response = await axios.post(
      `${API_BASE_URL}/program/zoom`,
      sessionData
    );
    return response.data;
  },

  insertSessionData: async (sessionData) => {
    const response = await axios.post(
      `${API_BASE_URL}/program/zoom/insertData`,
      sessionData
    );
    return response.data;
  },

  selectSessionList: async (userNo) => {
    const response = await axios.get(
      `${API_BASE_URL}/program/zoom/sessions/${userNo}`
    );
    return response.data;
  },

  updateSessionData: async (session) => {
    const response = await axios.put(
      `${API_BASE_URL}/program/zoom/updateData`,
      session
    );
    return response.data;
  },

  selectSessionListByProfNo: async () => {
    const response = await axios.get(
      `${API_BASE_URL}/program/zoom/sessions/prof`
    );
    return response.data;
  },
};
