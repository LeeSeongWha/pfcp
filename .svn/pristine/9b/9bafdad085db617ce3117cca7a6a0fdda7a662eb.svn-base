import { useEffect, useState } from 'react';
import StatCard from '../../components/staff/StatCard';

import GradeChart from '../../components/staff/GradeChart';
import LectureChart from '../../components/staff/LectureChart';
import ProgramChart from '../../components/staff/ProgramChart';
import ScholarshipChart from '../../components/staff/ScholarshipChart';
import StudentChart from '../../components/staff/StudentChart';
import { fetchLectureDashboard } from "../../services/statisticsAPI";

const StaffDashboard = () => {
  const [lectureData, setLectureData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);


     useEffect(() => {
    const loadStats = async () => {
      try {
        const lecture = await fetchLectureDashboard();
        setLectureData(lecture);
      } catch (e) {
        console.error("📉 통계 데이터 오류:", e);
      }
    };
    loadStats();
  }, []);

    const tabList = [
    "강의 통계",
    "학생 통계",
    "성적 통계",
    "비교과"
  ];


    return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">교직원 통계 대시보드</h2>

      {/* 탭 메뉴 */}
      <div className="border-b mb-4">
        <ul className="flex gap-4">
          {tabList.map((label, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer pb-2 px-4 border-b-2 transition-colors duration-200 ${
                activeTab === index ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* 탭별 콘텐츠 */}
      {activeTab === 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="학생 수" value={lectureData?.totalStudentCount} />
            <StatCard title="교수 수" value={lectureData?.totalProfessorCount} />
            <StatCard title="강의 수" value={lectureData?.totalLectureCount} />
          </div>
          <LectureChart />
        </>
      )}

      {activeTab === 1 && (
         <StudentChart />
      )}

      {activeTab === 2 && (
        <GradeChart />
      )}
      {activeTab === 3 && (
        <ProgramChart />
      )}
      {/* {activeTab === 4 && (
        <ScholarshipChart />
      )} */}
    </div>
  );

};
export default StaffDashboard