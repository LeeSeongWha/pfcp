import { Link, useLocation, useNavigate, useParams } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import useBreadcrumbs from "../hooks/useBreadcrumbs";
import { useEffect, useState } from "react";
import { myLecture } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import MaterialRoom from "../components/material/MaterialRoom";
import { useSearch } from "../hooks/useSearch";
import ExamRoom from "../components/exam/Exam";
import PageMeta from "../components/common/PageMeta";
import axios from "axios";
import { utils } from "../utils/utils";

export default function EclassAssignmentListAll() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const breadcrumbs = useBreadcrumbs();
  const [assignmentList, setAssignmentList] = useState([]);
  const { user } = useAuth();
  console.log(assignmentList);
  const searchFields = ["assignTitle", "assignDeadline"];

  // 날짜를 12시간 형식으로 포맷하는 함수

  const sortedData = assignmentList.sort((a, b) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // 오늘 끝으로 설정

    const dateA = new Date(a.assignDeadline);
    const dateB = new Date(b.assignDeadline);

    // 오늘 마감 여부 확인
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const isAToday = dateA >= todayStart && dateA <= todayEnd;
    const isBToday = dateB >= todayStart && dateB <= todayEnd;

    // 1. 오늘 마감이 최우선
    if (isAToday && !isBToday) return -1;
    if (!isAToday && isBToday) return 1;

    // 2. 마감된 것과 안된 것 분리
    const isAPast = dateA < todayStart;
    const isBPast = dateB < todayStart;

    if (!isAPast && isBPast) return -1; // A가 마감 안됨, B가 마감됨
    if (isAPast && !isBPast) return 1; // A가 마감됨, B가 마감 안됨

    // 3. 같은 그룹 내에서는 마감일순
    return dateA - dateB;
  });

  const {
    searchTerm,
    filteredData: filteredData,
    handleSearchChange,
    clearSearch,
    setSearchTerm,
  } = useSearch(sortedData, searchFields);

  const { currentData, loading, hasMore, loadingRef } = useInfiniteScroll(
    searchTerm ? filteredData : sortedData,
    6
  ); // 6개씩 불러오도록

  useEffect(() => {
    axios
      .get(`http://localhost/rest/assignment/all/${user.username}`)
      .then((resp) => setAssignmentList(resp.data));
  }, [user]);

  const renderAssignmentContent = () => (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">과제 목록</h1>
            <p className="text-sm text-gray-500">
              총 {assignmentList.length}개의 과제
            </p>
          </div>
        </div>
      </div>

      {/* 과제 카드 목록 */}
      <div className="grid gap-4 mb-8">
        {/* 검색바 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="자료 제목이나 내용으로 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                onClick={() => clearSearch()}
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
        {currentData.map((a) => (
          <div
            key={a.assignNo}
            className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer transition-all"
            onClick={() =>
              navigate(
                `/eclass/lecture/${params.userNo}/${a.lecNo}/assignment/${a.assignTitle}`,
                {
                  state: { ...a },
                }
              )
            }
          >
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  {a.assignTitle}
                </h3>
                <p className="text-gray-600 mt-2 mb-3 line-clamp-2">
                  {a.assignDesp}
                </p>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <span>
                    기한: {utils.formatDateTo12Hour(a.assignDeadline)}
                  </span>
                  {/* 마감 D-day 표시 */}
                  {(() => {
                    const today = new Date();
                    const deadline = new Date(a.assignDeadline);
                    const diff = Math.ceil(
                      (deadline - today) / (1000 * 60 * 60 * 24)
                    );
                    if (diff < 0)
                      return (
                        <span className="px-2 py-1 text-red-700 bg-red-100 rounded-full text-xs">
                          마감
                        </span>
                      );
                    if (diff <= 3)
                      return (
                        <span className="px-2 py-1 text-orange-700 bg-orange-100 rounded-full text-xs">
                          {diff}일 남음
                        </span>
                      );
                    if (diff <= 7)
                      return (
                        <span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full text-xs">
                          {diff}일 남음
                        </span>
                      );
                    return (
                      <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full text-xs">
                        {diff}일 남음
                      </span>
                    );
                  })()}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-blue-600"
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

      {/* 로딩 or 끝 */}
      {loading && (
        <div className="text-center text-gray-500 py-4">로딩 중...</div>
      )}
      {!hasMore && !loading && (
        <div className="text-center text-gray-400 py-4">
          모든 과제를 불러왔습니다
        </div>
      )}

      {/* 감지용 div (IntersectionObserver) */}
      <div ref={loadingRef} className="h-10" />
    </>
  );

  return (
    <div>
      <PageMeta title="부엉대 | 과제 목록" />
      <PageBreadcrumb pageTitle="모든 과제 목록" breadcrumbs={breadcrumbs} />

      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12">
        {renderAssignmentContent()}
      </div>
    </div>
  );
}
