import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { myLecture } from "../services/userService";

function EclassAssignmentForm() {
  const location = useLocation();
  const lecture = location.state;
  const subjectName = lecture.subject?.subjectName;
  const param = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lecNo: param.lectureName,
    assignTitle: "",
    assignDeadline: "",
    assignDesp: "",
    fileRefNo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData : ", formData);

    myLecture.createAssignment(formData);
    navigate(
      `/eclass/lecture/${param.userNo}/${param.lectureName}/assignment`,
      {
        state: lecture,
      }
    );
    window.location.reload();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fileRefNo: file.name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        과제 등록
      </h1>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="assignTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            강의명
          </label>
          <input
            type="text"
            value={subjectName}
            placeholder={subjectName}
            disabled
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 과제 제목 */}
        <div>
          <label
            htmlFor="assignTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            과제 제목
          </label>
          <input
            type="text"
            id="assignTitle"
            name="assignTitle"
            value={formData.assignTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* 마감일 */}
        <div>
          <label
            htmlFor="assignDeadline"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            마감일
          </label>
        </div>

        {/* 과제 설명 */}
        <div>
          <label
            htmlFor="assignDesp"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            과제 설명
          </label>
          <textarea
            id="assignDesp"
            name="assignDesp"
            value={formData.assignDesp}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            required
          />
        </div>

        {/* 파일 첨부 */}
        <div>
          <label
            htmlFor="fileRefNo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            첨부파일 (선택사항)
          </label>
          <input
            type="file"
            id="fileRefNo"
            name="fileRefNo"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {formData.fileRefNo && (
            <p className="text-sm text-gray-500 mt-1">
              선택된 파일: {formData.fileRefNo}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            과제 생성
          </button>
        </div>
      </div>
    </div>
  );
}

export default EclassAssignmentForm;
