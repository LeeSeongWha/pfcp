import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_AXIOS_API_BASE_URL;

export const myLecture = {
  myLectureList: async (userNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecture/lectureList/${userNo}`
      );
      return response.data;
    } catch (error) {
      console.error("myLectureList 에러:", error);
      throw error;
    }
  },

  myLectureListByStdNo: async (userNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lectureEnrollment/${userNo}`
      );
      return response.data;
    } catch (error) {
      console.error("myLectureListByStdNo 에러:", error);
      throw error;
    }
  },

  myAssignmentListByLecNo: async (lecNo) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/assignment/${lecNo}`);
      return response.data;
    } catch (error) {
      console.error("myAssignmentListByLecNo 에러:", error);
      throw error;
    }
  },

  myAssignmentDetail: async (assignmentId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assignment/${assignmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("myAssignmentDetail 에러:", error);
      throw error;
    }
  },

  myExamListByByUserNo: async (userNo, lecNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/exam/${userNo}/${lecNo}`
      );

      return response.data;
    } catch (error) {
      console.error("myExamListByByLecNo 에러:", error);
      throw error;
    }
  },

  myExamDetail: async (examNo) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/exam/${examNo}`);

      return response.data;
    } catch (error) {
      console.error("myExamDetail 에러:", error);
    }
  },

  createAssignment: async (assignment) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/assignment`,
        assignment
      );
      return response.data;
    } catch (error) {
      console.error("createAssignment 에러:", error);
      throw error;
    }
  },

  uploadAssignment: async (assignment) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/assignment/assign-submission`,
        assignment,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("uploadAssignment 에러:", error);
      alert("과제 제출 중 오류가 발생했습니다.");
      throw error;
    }
  },

  getSubmittedFile: async (assignNo, studentNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assignment/assign-submission/${assignNo}/${studentNo}`
      );
      return response.data;
    } catch (error) {
      console.error("getSubmittedFile 에러:", error);
      alert("제출된 파일 조회 중 오류가 발생했습니다.");
      throw error;
    }
  },

  fileDownload: async (fileInfo) => {
    console.log(fileInfo);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/file/download/${fileInfo.fileRefNo}`,
        {
          responseType: "blob",
        }
      );

      // blob 객체 생성
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      // 다운로드 링크 생성 및 클릭
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        fileInfo.fileName || fileInfo.atchFile.atchOriginName || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
      alert("파일 다운로드에 실패했습니다.");
    }
  },

  getSubmittedFiles: async (assignNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/assignment/assign-submission/list/${assignNo}`
      );
      return response.data;
    } catch (error) {
      console.error("getSubmittedFiles 에러:", error);
      alert("제출된 파일 조회 중 오류가 발생했습니다.");
      throw error;
    }
  },

  createLectureMaterial: async (material) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/lecture/material`,
        material,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error("createLectureMaterial 에러:", e);
      alert("자료 등록 중 오류가 발생했습니다.");
      throw e;
    }
  },

  getLectureMaterialList: async (lecNo) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lecture/material/${lecNo}`
      );
      return response.data;
    } catch (error) {
      console.error("getLectureMaterialList 에러 : ", error);
      alert("자료를 불러오는 중 오류가 발생했습니다.");
      throw error;
    }
  },

  updateLectureMaterial: async (material) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/lecture/material`,
        material,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error("updateLectureMaterial 에러:", e);
      alert("자료 등록 중 오류가 발생했습니다.");
      throw e;
    }
  },

  deleteLectureMaterial: async (materialNo) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/lecture/material/${materialNo}`
      );
      return response.data;
    } catch (error) {
      console.error("deleteLectureMaterial 에러 :", error);
      alert("자료 삭제 중 오류가 발생했습니다.");
      throw error;
    }
  },

  getSubmitScore: async (submission, scoreInput) => {
    await axios.put(
      "http://localhost/rest/assignment/assign-submission/score",
      {
        submitNo: submission.submitNo,
        submitScore: scoreInput,
      }
    );
  },
};
