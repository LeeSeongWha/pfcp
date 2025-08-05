import { Award, Calendar, FileText, User } from "lucide-react";

function AssignmentSubmissionListTable({ submissions }) {
  // 샘플 데이터 (실제로는 props나 API에서 받아올 데이터)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return dateString;
  };

  const formatScore = (score) => {
    if (score === null || score === undefined) return "미채점";
    return `${score}점`;
  };

  return (
    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          과제 제출 현황
        </h2>
      </div>

      <div className="overflow-x-auto overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                학생정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                일시
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                채점상태
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.submitNo} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {submission.user.userName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {submission.user.userNo}
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
                  <div className="text-sm text-gray-900">
                    {submission.fileRefNo ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        제출
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        파일 없음
                      </span>
                    )}
                  </div>
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
            ))}
          </tbody>
        </table>
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">제출된 과제가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default AssignmentSubmissionListTable;
