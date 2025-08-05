import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { fetchLectureDashboard } from "../../services/statisticsAPI";

const LectureChart = () => {
  const [lectureDashboard, setLectureDashboard] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchLectureDashboard();
        setLectureDashboard(data);
      } catch (error) {
        console.error("📉 강의 통계 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    loadData();
  }, []);

  if (!lectureDashboard) return <div className="p-6">📊 데이터를 불러오는 중입니다...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. 학기별 개설 강의 수 */}
      <ChartSection
        chartId="openStats"
        title="학기별 강의 개설 수"
        type="bar"
        data={{
          labels: lectureDashboard.openStats.map(item => item.semester),
          datasets: [
            {
              label: "개설 강의 수",
              data: lectureDashboard.openStats.map(item => item.lectureCount),
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
          plugins: { legend: { position: "top" } },
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 50, // 최대값이 15여도 20까지 보이게 함
            },
          },
        }}
      />

      {/* 2. 강의 유형별 비율 */}
      <ChartSection
        chartId="typeRatio"
        title="강의 유형별 비율"
        type="doughnut"
        data={{
          labels: lectureDashboard.typeRatio.map(item => item.lectureType),
          datasets: [
            {
              label: "강의 수",
              data: lectureDashboard.typeRatio.map(item => item.typeCount),
              backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{ responsive: true }}
      />

      {/* 3. 계열별 교수당 평균 강의 수 */}
      <ChartSection
        chartId="avgByGroup"
        title="계열별 교수당 평균 강의 수"
        type="bar"
        data={{
          labels: lectureDashboard.avgByGroup.map(item => item.departmentGroup),
          datasets: [
            {
              label: "평균 강의 수",
              data: lectureDashboard.avgByGroup.map(item => item.avgLecturePerProfessor),
               backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(0, 153, 255, 0.6)'
                ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />

      <ChartSection
        chartId="capacityRate"
        title="강의 유형별 수강률 (%)"
        type="bar"
        data={{
          labels: lectureDashboard.capacityRate.map(item => item.typeName),
          datasets: [
            {
              label: "수강률 (%)",
              data: lectureDashboard.capacityRate.map(item => {
                const rate = item.totalCapacity === 0 ? 0 : (item.totalEnrolled / item.totalCapacity) * 100;
                return Number(rate.toFixed(1)); // 소수점 1자리까지
              }),
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
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: context => `${context.raw}%`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 120,
              ticks: {
                callback: (value) => `${value}%`,
              },
              title: {
                display: true,
                text: "수강률 (%)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LectureChart;
