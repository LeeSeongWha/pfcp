import { useEffect, useState } from "react";
import ChartSection from "./ChartSection";
import { fetchScholarshipDashboard } from "../../services/statisticsAPI";

const ScholarshipChart = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchScholarshipDashboard();
      setDashboard(data);
    };
    loadData();
  }, []);

  if (!dashboard) return <div className="p-6">📊 장학금 통계 데이터를 불러오는 중입니다...</div>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. 장학금 유형별 지급 횟수 */}
      <ChartSection
        chartId="typeFrequency"
        title="장학금 유형별 지급 횟수"
        type="bar"
        data={{
          labels: dashboard.grantCounts.map(d => d.typeName),
          datasets: [
            {
              label: "지급 횟수",
              data: dashboard.grantCounts.map(d => d.grantCount),
              backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />

      {/* 2. 장학금 유형별 평균 감면액 */}
      <ChartSection
        chartId="typeAvgAmount"
        title="장학금 유형별 평균 감면액"
        type="doughnut"
        data={{
          labels: dashboard.averageDiscounts.map(d => d.typeName),
          datasets: [
            {
              label: "평균 감면액 (원)",
              data: dashboard.averageDiscounts.map(d => d.avgDiscount),
               backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { position: "right" } } }}
      />

      {/* 3. 학과별 총 수혜액 */}
      <ChartSection
        chartId="deptTotalAmount"
        title="학과별 총 장학금 수혜액"
        type="bar"
        data={{
          labels: dashboard.departmentTotals.map(d => d.departmentName),
          datasets: [
            {
              label: "총 수혜액 (원)",
              data: dashboard.departmentTotals.map(d => d.totalDiscount),
               backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
            },
          ],
        }}
        options={{ indexAxis: "y", plugins: { legend: { display: false } } }}
      />

      {/* 4. 학기별 장학금 지급 추이 (더미 데이터 유지) */}
      <ChartSection
        chartId="semesterTrend"
        title="학기별 장학금 지급 추이"
        type="line"
        data={{
          labels: ["2022-1", "2022-2", "2023-1", "2023-2", "2024-1"],
          datasets: [
            {
              label: "장학금 총액 (백만원)",
              data: [320, 340, 370, 390, 410],
              borderColor: 'rgba(0, 153, 255, 0.6)',
               backgroundColor: [   
                    'rgba(51, 102, 255, 0.5)',
                ],
              tension: 0.4,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: true } },
          scales: { y: { beginAtZero: true } },
        }}
      />
    </div>
  );
};

export default ScholarshipChart;
