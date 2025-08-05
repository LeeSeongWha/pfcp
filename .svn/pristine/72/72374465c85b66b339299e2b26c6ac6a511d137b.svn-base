import axios from "axios";
import React, { useState } from "react";
import { useTableData } from "../../hooks/useTableData";
import SearchBar from "../common/SearchBar";
import TableInfo from "../common/TableInfo";
import Pagination from "../common/Pagination";
import {
  Award,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  User,
  XCircle,
} from "lucide-react";
import { myLecture } from "../../services/userService";
import { useToast } from "../../hooks/useToast";
import Toast from "../common/Toast";

const SubmissionTable = ({
  submissions,
  selectedSubmission,
  handleRowClick,
  handleFileDownload,
  formatScore,
  setSelectedSubmission,
}) => {
  const [editScore, setEditScore] = useState(null);
  const [scoreInput, setScoreInput] = useState("");
  const { toast, showToast, hideToast } = useToast();

  // 검색 필드 정의
  const searchFields = [
    "user.userName",
    "userName",
    "user.userNo",
    "userNo",
    "submitDate",
  ];

  // 통합 테이블 데이터 훅 사용
  const {
    searchTerm,
    currentData: currentSubmissions,
    handleSearchChange,
    clearSearch,
    currentPage,
    totalPages,
    handlePageChange,
    getPageNumbers,
    startIndex,
    endIndex,
    totalItems,
    filteredData,
  } = useTableData(submissions, searchFields, 7);

  const handleScoreSave = async (submission) => {
    const isConfirmed = window.confirm("점수를 기입하시겠습니까?");
    if (!isConfirmed) return;

    try {
      myLecture.getSubmitScore(submission, scoreInput);
      submission.submitScore = scoreInput;
      setEditScore(null);
      showToast(
        `점수가 성공적으로 저장되었습니다. (${scoreInput}점)`,
        "success"
      );
    } catch (error) {
      console.error(error);
      showToast("점수 저장에 실패했습니다.", "error");
    }
  };

  // 페이지 변경 시 상세 정보 닫기
  const handlePageChangeWithReset = (page) => {
    handlePageChange(page);
    setSelectedSubmission(null);
  };

  // 검색 시 상세 정보 닫기
  const handleSearchWithReset = (e) => {
    handleSearchChange(e);
    setSelectedSubmission(null);
  };

  return (
    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] h-[760px] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">제출 현황</h2>

        {/* 검색 바 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchWithReset}
          onClearSearch={clearSearch}
          placeholder="이름, 학번, 날짜로 검색..."
          className="w-64"
        />
      </div>

      {/* 테이블 정보 */}
      <TableInfo
        filteredCount={filteredData.length}
        totalCount={submissions.length}
        startIndex={startIndex}
        endIndex={endIndex}
        searchTerm={searchTerm}
      />

      {/* 테이블 */}
      <div className="flex-1 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제출자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제출일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  점수
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {searchTerm
                      ? "검색 결과가 없습니다."
                      : "제출 데이터가 없습니다."}
                  </td>
                </tr>
              ) : (
                currentSubmissions.map((submission) => (
                  <React.Fragment key={submission.submitNo}>
                    <tr
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleRowClick(submission)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {submission.user?.userName || submission.userName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.user?.userNo || submission.userNo}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {submission.submitDate}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {submission.fileRefNo ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            제출
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            미제출
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-gray-400 mr-2" />
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              submission.submitScore !== null
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {formatScore(submission.submitScore)}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* 상세 정보 드롭다운 */}
                    {selectedSubmission?.submitNo === submission.submitNo && (
                      <tr>
                        <td colSpan="4" className="px-6 py-0">
                          <div className="bg-gray-50 p-6 rounded-lg mx-4 mb-4 border-l-4 border-blue-400">
                            <h3 className="text-lg font-semibold mb-4">
                              제출 상세 정보
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  제출자
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {submission.user?.userName ||
                                    submission.userName}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  학번
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {submission.user?.userNo || submission.userNo}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600 mb-1">
                                  제출일
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  {submission.submitDate}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Award className="w-4 h-4 text-gray-400 mr-2" />
                                {editScore === submission.submitNo ? (
                                  <>
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={scoreInput}
                                      onChange={(e) =>
                                        setScoreInput(e.target.value)
                                      }
                                      className="w-16 text-sm border border-gray-300 rounded-md px-2 py-1"
                                    />
                                    <button
                                      className="ml-2 text-sm text-green-600 hover:text-green-800"
                                      onClick={() =>
                                        handleScoreSave(submission)
                                      }
                                    >
                                      저장
                                    </button>
                                  </>
                                ) : (
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      submission.submitScore !== null
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    } cursor-pointer`}
                                    onClick={() => {
                                      setEditScore(submission.submitNo);
                                      setScoreInput(
                                        submission.submitScore ?? "0"
                                      );
                                    }}
                                  >
                                    {formatScore(submission.submitScore)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {submission.fileRefNo && (
                              <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <p className="text-sm text-gray-700">
                                        {submission.atchFile.atchOriginName}
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      handleFileDownload(submission)
                                    }
                                    className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md transition-colors"
                                    title="파일 다운로드"
                                  >
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => setSelectedSubmission(null)}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-md transition-colors"
                              >
                                닫기
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChangeWithReset}
        getPageNumbers={getPageNumbers}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredData.length}
      />

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
};

export default SubmissionTable;
