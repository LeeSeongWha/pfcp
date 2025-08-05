import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { myLecture } from "../services/userService";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

function EclassAssignmentManager() {
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return dateString;
  };

  const formatScore = (score) => {
    if (score === null || score === undefined) return "미채점";
    return `${score}점`;
  };

  const [formData, setFormData] = useState({
    lecNo: param.lectureName,
    assignTitle: "",
    assignDeadline: "",
    assignDesp: "",
    fileRefNo: null,
  });

  const [selectedDate, setSelectedDate] = useState();

  const lecture = location.state;
  const subjectName = lecture.lectureReq?.lecName;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  console.log(location.state);

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

  const backToList = () => {
    navigate(-1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const formatted = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : "";
    setFormData((prev) => ({
      ...prev,
      assignDeadline: formatted,
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
            마감일시
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15} // 선택 가능한 시간 간격 (15분 단위)
            dateFormat="yyyy-MM-dd'T'HH:mm:ss"
            placeholderText="날짜를 선택하세요"
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
          />
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

        {/* 버튼 */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            onClick={backToList}
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

export default EclassAssignmentManager;
