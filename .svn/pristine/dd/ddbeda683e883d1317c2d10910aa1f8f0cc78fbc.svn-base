// src/services/statisticsAPI.js
const API_BASE_URL = import.meta.env.VITE_AXIOS_API_BASE_URL;

export const fetchLectureDashboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/statistics/lecture`);
    if (!response.ok) throw new Error("서버 응답 오류");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(" 강의 통계 데이터를 가져오는 중 오류 발생:", err);
    return null;
  }
};

export const fetchStudentDashboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/statistics/student`);
    if(!response.ok) throw new Error("서버응답오류");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("학생 통계 데이터를 가져오는 중 오류 발생", err);
    return null;
  }
}


export const fetchGradeDashboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/statistics/grade`);
    if(!response.ok) throw new Error("서버응답오류");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("성적 통계 데이터를 가져오는 중 오류 발생", err);
    return null;
  }
}

export const fetchProgramDashboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/statistics/program`);
    if(!response.ok) throw new Error("서버응답오류");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("비교과 통계 데이터를 가져오는 중 오류 발생", err);
    return null;
  }
}

export const fetchScholarshipDashboard = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/staff/statistics/scholarship`);
    if (!response.ok) throw new Error("서버 응답 오류");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("장학금 통계 데이터를 가져오는 중 오류 발생:", err);
    return null;
  }
};

