import { FileText, Download } from "lucide-react";
import Toast from "../common/Toast";
import { useToast } from "../../hooks/useToast";
import { useParams } from "react-router";
import { myLecture } from "../../services/userService";

const SubmissionPanel = ({
  fileInputRef,
  selectedFileName,
  submittedFile,
  selectedSubmission,
  handleFileChange,
  handleFileDownload,
  formatScore,
  user,
  assignmentData,
}) => {
  const currentSubmission = selectedSubmission || submittedFile;
  const params = useParams();
  const { toast, showToast, hideToast } = useToast();

  const submitScore =
    currentSubmission.submitScore === null ? 0 : currentSubmission.submitScore;

  // 제출된 파일이 있는지 확인 (실제 파일이 있는 경우만)
  const hasSubmittedFile =
    (selectedFileName && selectedFileName.trim() !== "") ||
    (currentSubmission &&
      currentSubmission.fileName &&
      currentSubmission.fileName.trim() !== "" &&
      currentSubmission.fileName !== "파일이 없습니다." &&
      currentSubmission.submitted === true);

  // 파일명 줄이기 함수
  const truncateFileName = (fileName, maxLength = 18) => {
    if (!fileName || fileName.length <= maxLength) return fileName;

    const extension = fileName.split(".").pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf("."));

    if (nameWithoutExt.length + extension.length + 3 <= maxLength) {
      return fileName;
    }

    const availableLength = maxLength - extension.length - 3;
    const frontLength = Math.ceil(availableLength / 2);
    const backLength = Math.floor(availableLength / 2);

    const frontPart = nameWithoutExt.substring(0, frontLength);
    const backPart = nameWithoutExt.substring(
      nameWithoutExt.length - backLength
    );

    return `${frontPart}...${backPart}.${extension}`;
  };

  const handleSubmit = () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("assignNo", assignmentData.assignNo);
    formData.append("studentNo", params.userNo);

    myLecture.uploadAssignment(formData);
    showToast("제출이 완료되었습니다.", "success");
  };

  return (
    <div className="w-full xl:w-80 shrink-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] h-[300px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">제출하기</h2>

      <div className="mb-4 flex-1">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />

        {/* 제출된 파일이 있을 때만 표시 */}
        {hasSubmittedFile && (
          <>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      제출된 파일
                    </p>
                    <p
                      className="text-sm text-gray-700"
                      title={selectedFileName || currentSubmission.fileName}
                    >
                      {truncateFileName(
                        selectedFileName || currentSubmission.fileName
                      )}
                    </p>
                  </div>
                </div>
                {currentSubmission.fileName && selectedFileName && (
                  <button
                    onClick={() => handleFileDownload(currentSubmission)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md transition-colors flex-shrink-0 ml-2"
                    title="파일 다운로드"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 text-right mt-2">
              점수: {submitScore}/ 100
            </p>
          </>
        )}
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          제출
        </button>

        {selectedSubmission && user.roles[0].authority === "ROLE_PROF" && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              선택된 제출
            </h3>
            <p className="text-sm text-gray-600">
              제출자:{" "}
              {selectedSubmission.user?.userName || selectedSubmission.userName}
            </p>
            <p className="text-sm text-gray-600">
              제출일: {selectedSubmission.submitDate}
            </p>
            <p className="text-sm text-gray-600">
              점수: {formatScore(selectedSubmission.submitScore)}
            </p>
          </div>
        )}
      </div>
      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
};

export default SubmissionPanel;
