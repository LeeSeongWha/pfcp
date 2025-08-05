import { Link, Navigate, useNavigate, useParams } from "react-router";
import { myLecture } from "../services/userService";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import useBreadcrumbs from "../hooks/useBreadcrumbs";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

function EclassLectureListPage() {
  const param = useParams();
  const [myLectures, setMyLecutures] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const breadcrumbs = useBreadcrumbs();

  const authority = user.roles[0].authority;

  // 무한스크롤 훅 사용
  const { currentData, loading, hasMore, loadingRef, totalItems, loadedItems } =
    useInfiniteScroll(myLectures, 7);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const lectureList =
          authority === "ROLE_PROF"
            ? await myLecture.myLectureList(param.userNo)
            : await myLecture.myLectureListByStdNo(param.userNo);
        console.log("lectureList: ", lectureList);
        setMyLecutures(lectureList);
      } catch (error) {
        console.error("강의 리스트 가져오기 실패:", error);
      }
    };
    fetchLectures();
  }, [param.userNo, user.roles, authority]);

  return (
    <div>
      <PageBreadcrumb pageTitle="내 강의 목록" breadcrumbs={breadcrumbs} />

      <div className="min-h-[800px] rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1400px]">
          {/* 상단 헤더 영역 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {authority === "ROLE_PROF" ? "담당 강의" : "수강 강의"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  총 {myLectures.length}개의 강의
                </p>
              </div>
            </div>

            {authority === "ROLE_PROF" && (
              <Link
                to={"/session"}
                state={{ lectures: myLectures }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                강의 만들기
              </Link>
            )}
          </div>

          {myLectures.length > 0 ? (
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {/* 카드 그리드 레이아웃 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6 mt-1">
                {currentData.map((lecture, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(
                        `/eclass/lecture/${param.userNo}/${lecture.lecNo}/assignment`,
                        {
                          state: lecture,
                        }
                      );
                    }}
                    className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* 카드 헤더 - 구글 클래스룸 스타일 */}
                    <div className="relative h-32 bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                      {/* 패턴 배경 */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 0 0-8 0-8s8 0 8 0 0 8 0 8-8 0-8 0Z'/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

                      {/* 강의 제목 */}
                      <div className="relative z-10">
                        <h3 className="text-lg font-semibold truncate mb-1">
                          {lecture.lectureReq?.lecName || "N/A"}
                        </h3>
                        <p className="text-blue-100 text-sm">
                          {lecture.subject?.subjectName || "과목명"}
                        </p>
                        {authority === "ROLE_PROF" ? (
                          <p className="text-blue-100 text-sm">
                            {lecture.user.userName || "교수명"} 교수
                          </p>
                        ) : (
                          <p className="text-blue-100 text-sm">
                            {lecture.lectureReq?.userName || "교수명"} 교수
                          </p>
                        )}
                      </div>

                      {/* 우상단 메뉴 아이콘 */}
                      <div className="absolute top-4 right-4">
                        <svg
                          className="w-5 h-5 text-white/70 hover:text-white transition-colors"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </div>
                    </div>

                    {/* 카드 본문 */}
                    <div className="p-6">
                      {/* 기본 정보 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {lecture.subject?.gradeLevel || "1"}학년
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {lecture.subject?.credit || "N/A"} 학점
                        </div>
                      </div>

                      {/* 통계 정보 */}
                      <div className="space-y-3">
                        {authority === "ROLE_PROF" ? (
                          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-blue-600 dark:text-blue-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                수강생
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                              {lecture.currentEnrollment || 0}명
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-green-600 dark:text-green-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  출석률
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                {lecture.attendance || 0}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-4 h-4 text-orange-600 dark:text-orange-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  성적
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                                {lecture.grade || "N/A"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 수강 상태 (학생만) */}
                      {authority === "ROLE_STUDENT" && (
                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              상태
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                lecture.enrollStatus === "수강중"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400"
                              }`}
                            >
                              {lecture.enrollStatus || "N/A"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 카드 하단 */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              authority === "ROLE_PROF"
                                ? "bg-green-500"
                                : lecture.attendance >= 80
                                ? "bg-green-500"
                                : lecture.attendance >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {authority === "ROLE_PROF" ? "활성" : "진행중"}
                          </span>
                        </div>
                        <svg
                          className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 무한 스크롤 로딩 */}
              {hasMore && (
                <div
                  ref={loadingRef}
                  className="flex items-center justify-center py-8"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-gray-500 dark:text-gray-400">
                        강의를 불러오는 중...
                      </span>
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500 text-sm">
                      스크롤하여 더 보기
                    </div>
                  )}
                </div>
              )}

              {!hasMore && currentData.length > 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    모든 강의를 불러왔습니다 ({totalItems}개)
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-20 h-20 mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  강의가 없습니다
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {authority === "ROLE_PROF"
                    ? "새로운 강의를 만들어 시작해보세요"
                    : "수강할 강의를 등록하세요"}
                </p>
                {authority === "ROLE_PROF" && (
                  <Link
                    to={"/session"}
                    state={{ lectures: myLectures }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    강의 만들기
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EclassLectureListPage;
