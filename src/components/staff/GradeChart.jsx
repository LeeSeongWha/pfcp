import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { fetchGradeDashboard } from "../../services/statisticsAPI";


const GradeChart = () => {
  const [gradeData, setGradeData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGradeDashboard(); // 실제 API
        setGradeData(data);
      } catch (error) {
        console.error("📉 성적 통계 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    loadData();
  }, []);

  if (!gradeData) return <div className="p-6">📊 데이터를 불러오는 중입니다...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. 학기별 평균 성적 */}
      <ChartSection
        chartId="semesterAvgGrades"
        title="학기별 평균 성적"
        type="line"
        data={{
          labels: gradeData.semesterAvgGrades.map(item => item.semesterNo),
          datasets: [
            {
              label: "평균 성적",
              data: gradeData.semesterAvgGrades.map(item => item.avgGrade),
              borderColor: "#4e79a7",
              backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
              tension: 0.3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: false, max: 4.5 },
          },
        }}
      />

      {/* 2. 성적 분포 현황 */}
      <ChartSection
        chartId="gradeDistributions"
        title="성적 분포 현황"
        type="bar"
        data={{
          labels: gradeData.gradeDistributions.map(item => item.grade),
          datasets: [
            {
              label: "인원 수",
              data: gradeData.gradeDistributions.map(item => item.count),
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
            y: { beginAtZero: true },
          },
        }}
      />

      {/* 3. 학년별 성적 통계 */}
      <ChartSection
        chartId="gradeByYears"
        title="학년별 성적 통계"
        type="bar"
        data={{
          labels: gradeData.gradeByYears.map(item => `${item.studentGrade}학년`),
          datasets: [
            {
              label: "평균 성적",
              data: gradeData.gradeByYears.map(item => item.avgGrade),
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
            y: { beginAtZero: true, max: 4.5 },
          },
        }}
      />

      {/* 4. 성별 성적 비교 */}
      <ChartSection
        chartId="gradeByGenders"
        title="성별 성적 비교"
        type="bar"
        data={{
          labels: gradeData.gradeByGenders.map(item =>
            item.gender === "M" ? "남성" : "여성"
          ),
          datasets: [
            {
              label: "평균 성적",
              data: gradeData.gradeByGenders.map(item => item.avgGrade),
              backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 4.5 },
          },
        }}
      />
    </div>
  );
};

export default GradeChart;
