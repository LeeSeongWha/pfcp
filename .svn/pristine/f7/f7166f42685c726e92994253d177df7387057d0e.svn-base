import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import useBreadcrumbs from "../hooks/useBreadcrumbs";
import { myLecture } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { User, Calendar, Award, Download, FileText } from "lucide-react";
import SubmissionPanel from "../components/assignment/SubmissionPanel";
import SubmissionTable from "../components/assignment/SubmissionTable";
import AssignmentDetail from "../components/assignment/AssignmentDetail";
import { useToast } from "../hooks/useToast";

// 과제 단일 조회 페이지
function EclassLearningSpaceDetailPage() {
  const params = useParams();
  const breadcrumbs = useBreadcrumbs();
  const { user } = useAuth();
  const location = useLocation();
  const assignmentData = location.state;

  console.log("assignmentData : ", assignmentData);

  // 상태 관리
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [submittedAssigns, setSubmittedAssigns] = useState([]);
  const [success, setSuccess] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submittedFile, setSubmittedFile] = useState({
    fileName: null,
    fileRefNo: null,
    submitted: false,
  });

  const { showToast } = useToast();

  console.log(selectedSubmission);

  const fileInputRef = useRef();

  // 데이터 로딩
  useEffect(() => {
    const fetchSubmittedFile = async () => {
      const result = await myLecture.getSubmittedFile(
        assignmentData.assignNo,
        params.userNo
      );
      if (result) {
        setSubmittedFile({
          fileName: result.fileName,
          fileRefNo: result.fileRefNo,
          submitted: true,
          submitScore: result.submitScore,
        });
      } else {
        setSubmittedFile({
          fileName: "파일이 없습니다.",
          fileRefNo: "",
          submitted: false,
          submitScore: 0,
        });
      }
    };

    const fetchSubmittedFileList = async () => {
      const result = await myLecture.getSubmittedFiles(assignmentData.assignNo);
      setSubmittedAssigns(result);
    };

    fetchSubmittedFile();

    if (user.roles[0].authority === "ROLE_PROF") {
      fetchSubmittedFileList();
      console.log();
    }
  }, [assignmentData, params, user, success]);

  // 이벤트 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file?.name || null);
  };

  const handleFileDownload = (fileInfo) => {
    myLecture.fileDownload(fileInfo);
  };

  const handleRowClick = (submission) => {
    setSelectedSubmission(submission);
  };

  const formatScore = (score) => {
    return score !== null ? `${score}` : "미채점";
  };

  return (
    <div>
      <PageMeta
        title="부엉대 | 사이버 학습실"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="과제" breadcrumbs={breadcrumbs} />
      <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto p-6">
        {/* 왼쪽: 과제 정보 */}
        <AssignmentDetail assignmentData={assignmentData} />

        {/* 오른쪽: 제출 박스 또는 제출 현황 테이블 */}
        {user.roles[0].authority === "ROLE_STD" ? (
          <SubmissionPanel
            fileInputRef={fileInputRef}
            selectedFileName={selectedFileName}
            submittedFile={submittedFile}
            selectedSubmission={selectedSubmission}
            handleFileChange={handleFileChange}
            handleFileDownload={handleFileDownload}
            formatScore={formatScore}
            user={user}
            assignmentData={assignmentData}
          />
        ) : (
          <SubmissionTable
            submissions={submittedAssigns}
            selectedSubmission={selectedSubmission}
            handleRowClick={handleRowClick}
            handleFileDownload={handleFileDownload}
            formatScore={formatScore}
            setSelectedSubmission={setSelectedSubmission}
          />
        )}
      </div>
    </div>
  );
}

export default EclassLearningSpaceDetailPage;
