import { utils } from "../utils/utils";
import { sessionService } from "../services/sessionService";
import { useSessionForm } from "../hooks/useSessionForm";
import { useLocation, useNavigate } from "react-router";

function SessionCreatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const lectures = location.state?.lectures;

  const {
    session,
    isLoading,
    setSession,
    setIsLoading,
    updateSession,
    handleInputChange,
    resetForm,
  } = useSessionForm();

  const handleSubmit = async () => {
    if (!utils.validateSessionData(session)) {
      alert("모든 필드를 입력해주십시오.");
      return;
    }

    setIsLoading(true);

    try {
      const requestData = utils.toRequestData(session);
      console.log("요청 데이터 : ", requestData);

      const zoomResponse = await sessionService.createZoomSession(requestData);
      const respData = utils.toResponseData(zoomResponse);
      console.log("응답 데이터 : ", zoomResponse);

      const selectedLecture = lectures.find(
        (lec) => lec.subject?.subjectCode === session.lectureCode
      );
      console.log("respData", respData);

      updateSession(respData);

      const sessionData = {
        ...session,
        ...respData,
        start_time: respData.startDate || respData.start_time,
        title: session.title?.trim()
          ? session.title
          : selectedLecture?.subject?.subjectName || "",
        lecNo: selectedLecture.lecNo,
      };

      console.log("sessionData : ", sessionData);

      const insertResponse = await sessionService.insertSessionData(
        sessionData
      );

      console.log("db에 저장 응답 : ", insertResponse);
      console.log("세션 생성 성공 : ", respData);

      console.log("세션 생성 성공 : ", session);
    } catch (e) {
      console.error("세션 생성 실패 : ", e.response?.data || e.message);
      alert("세션 생성에 실패하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToList = () => {
    navigate("/eclass");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">세션 생성</h2>
        <button
          onClick={handleBackToList}
          className="flex items-center text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-md border border-gray-300 hover:border-gray-400 transition duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          목록으로 돌아가기
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            name="title"
            placeholder="세션 제목을 입력하세요"
            value={session.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          name="lectureCode"
          value={session.lectureCode || ""}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">강의선택</option>
          {lectures
            .filter((lec) => lec.lecStatus === "OPEN")
            .map((v, i) => (
              <option key={i} value={v.subject?.subjectCode}>
                {v.lectureReq?.lecName}
              </option>
            ))}
        </select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            시작 시간
          </label>
          <input
            name="startDate"
            type="datetime-local"
            value={session.startDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            세션 타입
          </label>
          <select
            name="type"
            value={session.type}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">세션 선택</option>
            <option value="LECTURE">강의</option>
            <option value="WEBINAR">웨비나</option>
            <option value="MEETING">미팅</option>
            <option value="DISCUSSION">토론</option>
            <option value="PRESENTATION">발표</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          세션 생성
        </button>
      </div>

      {/* 생성된 세션 정보 표시 */}
      {session.zoomMeetingId && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            세션이 성공적으로 생성되었습니다!
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">미팅 ID</p>
              <p className="font-mono text-lg font-semibold text-gray-800">
                {session.zoomMeetingId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">비밀번호</p>
              <p className="font-mono text-lg font-semibold text-gray-800">
                {session.password}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">참여 링크</p>
              <a
                href={session.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {session.joinUrl}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">호스트 이메일</p>
              <p className="text-gray-800">{session.hostEmail}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">시간대</p>
              <p className="text-gray-800">{session.timezone}</p>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => navigator.clipboard.writeText(session.joinUrl)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200"
            >
              링크 복사
            </button>
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  `미팅 ID: ${session.zoomMeetingId}\n비밀번호: ${session.password}`
                )
              }
              className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200"
            >
              정보 복사
            </button>
            <button
              onClick={handleBackToList}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200"
            >
              목록으로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionCreatePage;
