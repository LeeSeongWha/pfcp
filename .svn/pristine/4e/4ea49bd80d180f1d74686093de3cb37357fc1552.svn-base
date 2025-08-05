import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { utils } from "../../utils/utils";

const AssignmentDetail = ({ assignmentData }) => {
  const { user } = useAuth();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal(false);
  const [data, setData] = useState(assignmentData);

  // 폼 데이터는 data 상태를 기반으로 초기화
  const [formData, setFormData] = useState({
    assignTitle: data.assignTitle,
    assignDeadline: data.assignDeadline,
    assignDesp: data.assignDesp,
  });

  const [selectedDate, setSelectedDate] = useState(
    data.assignDeadline ? new Date(data.assignDeadline) : null
  );

  const modifyAssignment = async () => {
    try {
      const updatedData = {
        assignNo: data.assignNo,
        assignTitle: formData.assignTitle,
        assignDeadline: selectedDate ? selectedDate.toISOString() : null,
        assignDesp: formData.assignDesp,
      };

      // API 호출
      await axios.put("http://localhost/rest/assignment", updatedData);

      // 성공하면 로컬 상태를 즉시 업데이트 (서버 재호출 없이)
      setData((prev) => ({
        ...prev,
        assignTitle: formData.assignTitle,
        assignDeadline: selectedDate ? selectedDate.toISOString() : null,
        assignDesp: formData.assignDesp,
      }));

      closeModal();
    } catch (error) {
      console.error("과제 수정 실패:", error);
      alert("과제 수정에 실패했습니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // formData도 동기화 (선택사항 - 일관성을 위해)
    setFormData((prev) => ({
      ...prev,
      assignDeadline: date ? date.toISOString() : null,
    }));
  };

  const handleOpenModal = () => {
    // 모달 열 때마다 현재 data 상태로 formData 초기화
    setFormData({
      assignTitle: data.assignTitle,
      assignDeadline: data.assignDeadline,
      assignDesp: data.assignDesp,
    });
    setSelectedDate(data.assignDeadline ? new Date(data.assignDeadline) : null);
    openModal();
  };

  return (
    <>
      <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] h-[750px]">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">{data.assignTitle}</h1>
          {user.roles[0].authority === "ROLE_PROF" && (
            <Button onClick={handleOpenModal}>수정</Button>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-2">
          기한:{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            {utils.formatDateTo12Hour(data.assignDeadline)}
          </span>
        </p>

        <div className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap mb-4">
          {data.assignDesp}
        </div>
      </div>

      {/* 수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-999999">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 ease-out">
            <div className="bg-blue-500  px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  과제 수정
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-all duration-200"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 모달 바디 */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 ">
                    과제 제목
                  </label>
                  <input
                    type="text"
                    name="assignTitle"
                    value={formData.assignTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                    placeholder="과제 제목을 입력하세요"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
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

                <div className="group">
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                    과제 설명
                  </label>
                  <textarea
                    name="assignDesp"
                    value={formData.assignDesp}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                    placeholder="과제에 대한 자세한 설명을 입력하세요"
                  />
                </div>
              </div>

              {/* 모달 푸터 */}
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium min-w-[80px]"
                >
                  취소
                </button>
                <button
                  onClick={modifyAssignment}
                  className="px-6 py-3 text-white bg-blue-500 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[80px]"
                >
                  수정
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentDetail;
