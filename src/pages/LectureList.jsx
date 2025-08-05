import { useEffect, useState } from "react";
import { sessionService } from "../services/sessionService";
import {
  Calendar,
  Clock,
  ExternalLink,
  Filter,
  Lock,
  Unplug,
  User,
  Video,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function LectureList() {
  const [lectureList, setLectureList] = useState([]);
  const [selectedType, setSelectedType] = useState("ALL");
  const { user } = useAuth();

  const getTypeColor = (type) => {
    switch (type) {
      case "LECTURE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "EXAM":
        return "bg-red-100 text-red-800 border-red-200";
      case "SEMINAR":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case "LECTURE":
        return "강의";
      case "EXAM":
        return "시험";
      case "SEMINAR":
        return "세미나";
      default:
        return "기타";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const filteredLectures =
    selectedType === "ALL"
      ? lectureList
      : lectureList.filter((lecture) => lecture.type === selectedType);

  const handleJoinClick = (lecture) => {
    window.open(lecture.joinUrl, "_blank");
  };

  const handleEndSession = async (session) => {
    if (window.confirm("세션을 종료하시겠습니까?")) {
      try {
        const result = await sessionService.updateSessionData(session);
        setLectureList(result);
      } catch (error) {
        console.error("fetch 실패 : ", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          user.roles[0].authority === "ROLE_PROF"
            ? await sessionService.selectSessionListByProfNo()
            : await sessionService.selectSessionList(user.username);

        // 안전하게 배열인지 확인
        if (Array.isArray(result)) {
          setLectureList(result);
        } else {
          console.warn(
            "result.data가 배열이 아닙니다. fallback으로 빈 배열 사용"
          );
          setLectureList([]); // fallback
        }
      } catch (error) {
        console.error("에러 발생:", error);
        setLectureList([]); // fallback
      }
    };
    fetchData();
  }, [user.username, user.roles]);

  return (
    <div>
      <div className="max-w-[1600px] mx-auto p-6 bg-gray-50 min-h-max">
        {/* 필터 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">강의 유형</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["ALL", "LECTURE", "EXAM", "SEMINAR"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {type === "ALL" ? "전체" : getTypeText(type)}
              </button>
            ))}
          </div>
        </div>

        {/* 강의 리스트 */}
        <div className="space-y-6">
          {filteredLectures.map((lecture) => {
            const dateTime = formatDateTime(lecture.start_time);
            return (
              <div
                key={lecture.zoomMeetingId}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* 상단 영역: 태그 + 차시 + 참여 버튼 */}
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div className="flex flex-col gap-y-2">
                    {/* 정보줄 (강의 유형, 차시, 교수명, 과목명) */}
                    <div className="flex items-center gap-x-6 text-sm text-gray-600">
                      <div className="flex items-center gap-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                            lecture.type
                          )}`}
                        >
                          {getTypeText(lecture.type)}
                        </span>
                        <span className="text-gray-500 font-medium">
                          #{lecture.th}차시
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-500 font-medium">
                          {lecture.user.userName} 교수
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-500 font-medium">
                          과목 {lecture.lecture.subject?.subjectName}
                        </span>
                      </div>
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-gray-900 self-start">
                      {lecture.title}
                    </h3>
                  </div>

                  <div className="flex gap-2">
                    {/* 참여 버튼 */}
                    <button
                      onClick={() => handleJoinClick(lecture)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      참여하기
                    </button>

                    {/* 종료 버튼 */}
                    {user.username !== lecture.userNo ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleEndSession(lecture)}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                        <Unplug className="w-4 h-4" />
                        세션 종료
                      </button>
                    )}
                  </div>
                </div>

                {/* 회의 정보 */}
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{dateTime.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{dateTime.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-gray-500" />
                    <span>회의 ID: {lecture.zoomMeetingId}</span>
                  </div>
                  {/* 비밀번호 우측 정렬 */}
                  {lecture.password && (
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      비밀번호: {lecture.password}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  {/* 출석 필수 태그 왼쪽에 표시 */}
                  {lecture.attendanceRequired ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      출석 필수
                    </span>
                  ) : (
                    <span></span> // 자리 확보용 빈 span
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filteredLectures.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              해당 유형의 강의가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LectureList;
