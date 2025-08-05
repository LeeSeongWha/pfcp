import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useAuth } from "../../../context/AuthContext";

function PieChartOne() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // 더미 데이터 로드 함수
  const loadDummyData = useCallback(async () => {
    setLoading(true);

    const realData = await axios.get(
      `http://localhost/rest/student/statistics/attendance/${user.username}`
    );

    // 출석률 기준으로 내림차순 정렬
    const sortedData = realData.data.sort(
      (a, b) => b.attendanceRate - a.attendanceRate
    );

    // API 호출 시뮬레이션을 위한 지연
    setTimeout(() => {
      setAttendanceData(sortedData);
      setLoading(false);
    }, 300);
  }, []);

  // 출석률에 따른 색상 결정 함수
  const getColorByRate = useCallback((rate) => {
    if (rate >= 85) return "#00E396"; // 초록색 - 우수
    if (rate >= 70) return "#FEB019"; // 주황색 - 보통
    return "#FF4560"; // 빨간색 - 위험
  }, []);

  // 차트 옵션
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 400,
        fontFamily: "Outfit, sans-serif",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          dataLabels: {
            position: "top",
          },
        },
      },
      colors: attendanceData.map((item) => getColorByRate(item.attendanceRate)),
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          fontWeight: 600,
          colors: ["black"],
        },
        formatter: function (val) {
          return val + "%";
        },
      },
      xaxis: {
        categories: attendanceData.map((item) => item.lectureName),
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
        min: 0,
        max: 100,
        tickAmount: 5,
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
          maxWidth: 150,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: "12px",
          zIndex: 9999999,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const data = attendanceData[dataPointIndex];
          return `
          <div class="px-3 py-2" />
            <div class="font-semibold text-gray-800">${data.lectureName}</div>
            <div class="text-sm text-gray-600 mt-1">
              <div>출석률: <span class="font-semibold">${data.attendanceRate}%</span></div>
              <div>출석: ${data.attendanceCount}회 | 지각: ${data.lateCount}회 | 결석: ${data.absentCount}회</div>
            </div>
          </div>
        `;
        },
      },
      legend: {
        show: false,
      },
    }),
    [attendanceData, getColorByRate]
  );

  // 차트 시리즈 데이터
  const chartSeries = useMemo(
    () => [
      {
        name: "출석률",
        data: attendanceData.map((item) => item.attendanceRate),
      },
    ],
    [attendanceData]
  );

  // 통계 요약 계산
  const statistics = useMemo(() => {
    if (attendanceData.length === 0) return null;

    const rates = attendanceData.map((item) => item.attendanceRate);
    const average = Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
    const highest = Math.max(...rates);
    const lowest = Math.min(...rates);
    const excellentCount = rates.filter((rate) => rate >= 85).length;
    const warningCount = rates.filter((rate) => rate < 70).length;

    return {
      average,
      highest,
      lowest,
      excellentCount,
      warningCount,
      totalCount: rates.length,
    };
  }, [attendanceData]);

  useEffect(() => {
    loadDummyData();
  }, [loadDummyData]);

  if (loading) {
    return (
      <div className="w-full h-full p-5 sm:p-6 flex items-center justify-center">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-500 text-sm">
            출석 데이터 로딩중...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-5 sm:p-6">
      <div className="flex flex-col gap-3 mb-4">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            강의별 출석률 현황
          </h3>
          <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
            전체 강의의 출석률을 한눈에 비교해보세요
          </p>
        </div>
      </div>

      {/* 통계 요약 카드 */}
      {statistics && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4 relative">
          <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-900/20 text-center">
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {statistics.average}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">평균</div>
          </div>
          <div className="p-2 bg-green-50 rounded-lg dark:bg-green-900/20 text-center">
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">
              {statistics.highest}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">최고</div>
          </div>
          <div className="p-2 bg-red-50 rounded-lg dark:bg-red-900/20 text-center">
            <div className="text-sm font-semibold text-red-600 dark:text-red-400">
              {statistics.lowest}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">최저</div>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg dark:bg-emerald-900/20 text-center">
            <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              {statistics.excellentCount}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">우수</div>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg dark:bg-orange-900/20 text-center">
            <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              {statistics.warningCount}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">주의</div>
          </div>
        </div>
      )}

      <div className="w-full overflow-y-visible relative z-0">
        {attendanceData.length > 0 ? (
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={500}
          />
        ) : (
          <div className="flex items-center justify-center h-[320px] text-gray-500">
            출석 데이터가 없습니다.
          </div>
        )}
      </div>

      {/* 범례 */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">우수 (85%+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-orange-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">
            보통 (70-84%)
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded"></div>
          <span className="text-gray-600 dark:text-gray-400">
            주의 (70% 미만)
          </span>
        </div>
      </div>
    </div>
  );
}

export default PieChartOne;
