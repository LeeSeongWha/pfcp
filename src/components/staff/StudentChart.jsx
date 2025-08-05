import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { fetchStudentDashboard } from "../../services/statisticsAPI";

const StudentChart = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStudentDashboard();
        console.log("📊 studentData:", data);
        setStudentData(data);
      } catch (error) {
        console.error("📉 학생 통계 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    loadData();
  }, []);

  if (
    !studentData ||
    !Array.isArray(studentData.deptGradeStats) ||
    !Array.isArray(studentData.monthlyTrend) ||
    !Array.isArray(studentData.changeStatus) ||
    !Array.isArray(studentData.genderGradeStats)
  ) {
    return <div className="p-6">📊 학생 데이터를 불러오는 중입니다...</div>;
  }
  const statusLabelMap = {
    AC_GRADSUS: "졸업유예",
    AC_SUSPEND: "휴학",
    AC_RETURN: "복학",
    AC_MAJOR: "전과",
    AC_DOUBLE: "복수전공",
  };
  const pastelColors = [
    "#FFB3BA", // 연한 빨강
    "#FFDFBA", // 연한 오렌지
    "#FFFFBA", // 연한 노랑
    "#BAFFC9", // 연한 초록
    "#BAE1FF", // 연한 하늘
    "#D5BAFF", // 연한 보라
    "#FFCCE5", // 연한 핑크
    "#E0BBE4", // 연한 자주
    "#FFDAC1", // 살구색
    "#B5EAD7", // 민트
    "#C7CEEA", // 라벤더
    "#F2C6DE", // 인디핑크
    "#C8FACC", // 연녹
    "#FFD6A5", // 오렌지 파스텔
    "#A0CED9", // 파란 파스텔
    "#FCF5C7"  // 베이지 노랑
  ];


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. 단과대학/학년별 재학생 수 */}
      <ChartSection
        chartId="deptGradeStats"
        title="단과대학/학년별 재학생 수"
        type="bar"
        data={{
          labels: [...new Set(studentData.deptGradeStats.map(item => item.grade))],
          datasets: [...new Set(studentData.deptGradeStats.map(item => item.departmentGroup))].map((dept, index) => ({
            label: dept.replace("대학", ""),
            data: studentData.deptGradeStats
              .filter(item => item.departmentGroup === dept)
              .map(item => item.studentCount),
            backgroundColor: pastelColors[index % pastelColors.length] 
          })),
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: "top" } },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 130, // 최대값이 15여도 20까지 보이게 함
            },
          },
        }}
      />

      {/* 2. 연도별 재학생 수 변화 */}
      <ChartSection
        chartId="monthlyTrend"
        title="연도별 재학생 수 변화"
        type="line"
        data={{
          labels: studentData.monthlyTrend.map(item => item.year),
          datasets: [
            {
              label: "재학생 수",
              data: studentData.monthlyTrend.map(item => item.studentCount),
              borderColor: "#60a5fa",
            backgroundColor: [
                   
                    'rgba(51, 102, 255, 0.5)',
                   
                ],
              fill: true,
            },
          ],
        }}
        options={{ responsive: true }}
      />

      {/* 3. 학적 변동 사항 */}
      <ChartSection
        chartId="changeStatus"
        title="학적 변동 유형별 수"
        type="bar"
        data={{
          labels: studentData.changeStatus.map(item => statusLabelMap[item.typeCode] || item.typeCode), // 👈 라벨 한글화
          datasets: [
            {
              label: "변동 수",
              data: studentData.changeStatus.map(item => item.changeCount),
             backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 20, // 최대값이 15여도 20까지 보이게 함
            },
          },
          
        }}
      />

      {/* 4. 성별/학년별 분포 */}
        <ChartSection
        chartId="genderGradeStats"
        title="성별/학년별 분포"
        type="bar"
        data={{
          labels: [...new Set(studentData.genderGradeStats.map(item => item.grade))], // 학년별
          datasets: ["M", "W"].map(gender => ({
            label: gender === "M" ? "남성" : "여성",
            data: [...new Set(studentData.genderGradeStats.map(item => item.grade))].map(grade => {
              const found = studentData.genderGradeStats.find(item => item.grade === grade && item.gender === gender);
              return found ? found.studentCount : 0;
            }),
            backgroundColor: gender === "M" ? 'rgba(51, 102, 255, 0.5)' : 'rgba(112, 66, 209, 0.6)',
          })),
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 180,
              title: {
                display: true,
                text: "학생 수",
              },
            },
            x: {
              title: {
                display: true,
                text: "학년",
              },
            },
          },
        }}
      />


    </div>
  );
};

export default StudentChart;
