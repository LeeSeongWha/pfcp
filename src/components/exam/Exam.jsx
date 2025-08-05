import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { myLecture } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_AXIOS_API_BASE_URL;

export default function ExamRoom() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const authority = user.roles[0].authority;
  const [examList, setExamList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 시험 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await myLecture.myExamListByByUserNo(
          params.userNo,
          params.lectureName
        );
        console.log("params.userNo:", params.userNo);
        console.log("params.lecNo:", params.lectureName);
        console.log("responseData", responseData);

        setExamList(responseData);
      } catch (error) {
        console.error("시험 목록 불러오기 에러:", error);
      }
    };

    fetchData();
  }, [params]);

  const filteredExams = examList.filter((item) =>
    item.examName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedExams = filteredExams.sort((a, b) => {
    const dateA = new Date(a.examDate);
    const dateB = new Date(b.examDate);
    return dateB - dateA; // 최신순 정렬
  });

  const { currentData, loading, hasMore, loadingRef } = useInfiniteScroll(
    sortedExams,
    6
  );

  return (
    <>
      {/* 시험 목록 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">시험 목록</h1>
            <p className="text-sm text-gray-500">
              총 {examList.length}개의 시험
            </p>
          </div>
        </div>
      </div>

      {/* 검색바 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="시험 이름으로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-grey-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 시험 카드 목록 */}
      <div className="grid gap-4 mb-8">
        {currentData.map((a) => (
          <div
            key={a.examNo}
            className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={async () => {
                try {
                  const response = await axios.get(`${API_BASE_URL}/exam/submission-status`, {
                    params: {
                      examNo: a.examNo,
                      userNo: params.userNo,
                    }
                  });

                  if (response.data.isSubmitted === 'Y') {
                    alert("이미 제출한 시험입니다.");
                    return; // 이동 차단
                  }
                  console.log("params", params);

                  navigate(
                    `/eclass/lecture/${params.userNo}/${params.lectureName}/exam/${a.examName}`,
                    { state: { ...a } }
                  );
                } catch (error) {
                  console.error("시험 제출 상태 확인 실패:", error);
                  alert("오류가 발생했습니다. 나중에 다시 시도해주세요.");
                }
              }
            }
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                  {a.examName}
                </h3>
                <p className="text-gray-600 mt-2 mb-3 line-clamp-2">
                  시험 날짜: {a.examDate}
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>제한시간: {a.examLimit}</span>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 표시 */}
      {filteredExams.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-lg">
            {searchTerm ? "검색 결과가 없습니다" : "등록된 시험이 없습니다"}
          </p>
        </div>
      )}

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center text-gray-500 py-4">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414M19.07 19.07l-1.414-1.414M4.93 4.93L6.344 6.344" />
            </svg>
            로딩 중...
          </div>
        </div>
      )}

      {/* 더 불러올 데이터가 없을 때 */}
      {!hasMore && !loading && currentData.length > 0 && (
        <div className="text-center text-gray-400 py-4">
          모든 시험을 불러왔습니다
        </div>
      )}

      {/* 감지용 div */}
      <div ref={loadingRef} className="h-10" />
    </>
  );
}
