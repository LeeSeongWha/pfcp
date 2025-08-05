import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { fetchProgramDashboard } from "../../services/statisticsAPI";

const monthLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const typeCodeLabelMap = {
  PRG_CERT: "자격증",
  PRG_GENERAL: "일반",
  PRG_VOLUNTEER: "봉사",
  PRG_MILEAGE: "마일리지",
  PRG_LEADERSHIP: "리더십",
  PRG_CREATIVE: "창의역량",
  PRG_EMPLOYMENT: "취업연계"
};



const ProgramChart = () => {
  const [dashboard, setDashboard] = useState(null);
  const [maxParticipation, setMaxParticipation] = useState(100);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProgramDashboard();
        const max = Math.max(...data.collegeParticipationRates.map(d => d.participationRate));
        setDashboard(data);
        setMaxParticipation(Math.ceil(max+10));
      } catch (error) {
        console.error("📉 비교과 통계 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    loadData();
  }, []);

  if (!dashboard) return <div className="p-6">📊 비교과 데이터를 불러오는 중입니다...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. 월별 프로그램 개설 수 */}
      <ChartSection
        chartId="monthlyProgramCount"
        title="월별 프로그램 개설 수"
        type="line"
        data={{
          labels: dashboard.monthlyProgramCounts.map(d => monthLabels[parseInt(d.month) - 1]),
          datasets: [
            {
              label: "개설 수",
              data: dashboard.monthlyProgramCounts.map(d => d.programCount),
              borderColor: "#6366f1",
              backgroundColor: [
                   
                    'rgba(51, 102, 255, 0.5)',
                   
                ],
              tension: 0.3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        }}
      />

      {/* 2. 유형별 프로그램 개수 */}
      <ChartSection
        chartId="programTypeDist"
        title="유형별 프로그램 개수"
        type="doughnut"
        data={{
          labels: dashboard.typeCounts.map(d => typeCodeLabelMap[d.typeCode] || d.typeCode),
          datasets: [
            {
              label: "유형별 프로그램 개수",
              data: dashboard.typeCounts.map(d => d.programCount),
            backgroundColor: [
                    
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: "right" } },
        }}
      />

      {/* 3. 신청자 수 변화 추이 */}
      <ChartSection
        chartId="applicantTrend"
        title="신청자 수 변화 추이"
        type="line"
        data={{
          labels: dashboard.applyTrends.map(d => monthLabels[parseInt(d.month) - 1]),
          datasets: [
            {
              label: "신청자 수",
              data: dashboard.applyTrends.map(d => d.applyCount),
              borderColor: 'rgba(51, 102, 255, 0.5)',
             backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        }}
      />

       {/* 4. 계열별 프로그램 참여율 */}
      <ChartSection
        chartId="participationRadar"
        title="계열별 프로그램 참여율 비교"
        type="radar"
        data={{
          labels: dashboard.collegeParticipationRates.map(d => d.collegeName),
          datasets: [
            {
              label: "참여율 (%)",
              data: dashboard.collegeParticipationRates.map(d => d.participationRate),
              backgroundColor: [
                 
                    'rgba(0, 153, 255, 0.6)',
                ],
              borderColor:  'rgba(51, 102, 255, 0.5)',
              pointBackgroundColor: "#22c55e",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              suggestedMax: maxParticipation,
              ticks: {
                stepSize: 10,
                callback: (value) => `${value}`,
              },
              pointLabels: {
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: { position: "top" },
          },
        }}
      />
    </div>
  );
};

export default ProgramChart;
