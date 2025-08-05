import Chart from "react-apexcharts";
import ChartTab from "../../common/ChartTab";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function StatisticsChart() {
  const { user } = useAuth();
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });
  const [loading, setLoading] = useState(true);

  // 학기별 데이터 처리 로직을 별도 함수로 분리하고 메모이제이션
  const processSemesterData = useCallback((data) => {
    const semesterMap = new Map();

    data.forEach((item) => {
      const semesterName = item.semesterName;
      const gradePoint = parseFloat(item.gradePoint || 0);
      const credit = parseInt(item.credit || item.subject?.credit || 0);

      if (!semesterMap.has(semesterName)) {
        semesterMap.set(semesterName, {
          totalGradePoints: 0,
          totalCredits: 0,
          subjectCount: 0,
        });
      }

      const semesterData = semesterMap.get(semesterName);
      semesterData.totalGradePoints += gradePoint * credit;
      semesterData.totalCredits += credit;
      semesterData.subjectCount += 1;
    });

    return Array.from(semesterMap.entries())
      .map(([semesterName, data]) => ({
        semesterName,
        weightedGpa:
          data.totalCredits > 0 ? data.totalGradePoints / data.totalCredits : 0,
        totalCredits: data.totalCredits,
        subjectCount: data.subjectCount,
      }))
      .sort((a, b) => {
        const aYear = a.semesterName.match(/(\d{4})/)?.[1] || "0";
        const bYear = b.semesterName.match(/(\d{4})/)?.[1] || "0";
        const aSemester = a.semesterName.includes("1학기") ? 1 : 2;
        const bSemester = b.semesterName.includes("1학기") ? 1 : 2;

        if (aYear !== bYear) {
          return parseInt(aYear) - parseInt(bYear);
        }
        return aSemester - bSemester;
      });
  }, []);

  // API 호출 함수를 useCallback으로 메모이제이션
  const fetchGradeStatistics = useCallback(async () => {
    if (!user?.username) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost/rest/student/statistics/grade/${user.username}`
      );
      const data = response.data;

      const semesterArray = processSemesterData(data);

      if (semesterArray.length > 0) {
        const categories = semesterArray.map((item) => item.semesterName);
        const gpaData = semesterArray.map((item) =>
          parseFloat(item.weightedGpa.toFixed(2))
        );
        const creditData = semesterArray.map((item) => item.totalCredits);

        setChartData({
          categories,
          series: [
            {
              name: "평균 학점 (GPA)",
              data: gpaData,
            },
            {
              name: "이수 학점",
              data: creditData,
            },
          ],
        });
      } else {
        setChartData({
          categories: ["데이터 없음"],
          series: [
            {
              name: "평균 학점 (GPA)",
              data: [0],
            },
            {
              name: "이수 학점",
              data: [0],
            },
          ],
        });
      }
    } catch (error) {
      console.error("성적 통계 조회 실패:", error);
      setChartData({
        categories: ["데이터 없음"],
        series: [
          {
            name: "평균 학점 (GPA)",
            data: [0],
          },
          {
            name: "이수 학점",
            data: [0],
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, [user?.username, processSemesterData]);

  // 차트 옵션을 useMemo로 메모이제이션하여 불필요한 재생성 방지
  const chartOptions = useMemo(
    () => ({
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        labels: {
          colors: ["#374151"],
        },
      },
      colors: ["#465FFF", "#9CB9FF"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        height: 310,
        type: "line",
        toolbar: {
          show: false,
        },
        // 성능 최적화 옵션 추가
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          dynamicAnimation: {
            enabled: false, // 동적 애니메이션 비활성화로 성능 향상
          },
        },
        redrawOnParentResize: false, // 부모 크기 변경 시 자동 리드로우 비활성화
        redrawOnWindowResize: true,
      },
      stroke: {
        curve: "smooth",
        width: [3, 3],
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      markers: {
        size: 5,
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 8,
        },
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        followCursor: false, // 커서 따라가기 비활성화로 성능 향상
        y: {
          formatter: function (val, opts) {
            if (opts.seriesIndex === 0) {
              return val + " 점";
            } else {
              return val + " 학점";
            }
          },
        },
      },
      xaxis: {
        type: "category",
        categories: chartData.categories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
      },
      yaxis: [
        {
          title: {
            text: "평균 학점 (GPA)",
            style: {
              fontSize: "12px",
            },
          },
          labels: {
            style: {
              fontSize: "12px",
              colors: ["#6B7280"],
            },
            formatter: function (val) {
              return val.toFixed(1);
            },
          },
          min: 0,
          max: 4.5,
        },
        {
          opposite: true,
          title: {
            text: "이수 학점",
            style: {
              fontSize: "12px",
            },
          },
          labels: {
            style: {
              fontSize: "12px",
              colors: ["#6B7280"],
            },
          },
        },
      ],
    }),
    [chartData.categories]
  ); // categories가 변경될 때만 재생성

  // useEffect에서 fetchGradeStatistics 의존성 사용
  useEffect(() => {
    fetchGradeStatistics();
  }, [fetchGradeStatistics]);

  // 로딩 컴포넌트를 별도로 분리하여 최적화
  const LoadingComponent = useMemo(
    () => (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-500">
            통계 데이터를 불러오는 중...
          </span>
        </div>
      </div>
    ),
    []
  );

  // 빈 데이터 컴포넌트를 별도로 분리하여 최적화
  const EmptyDataComponent = useMemo(
    () => (
      <div className="flex items-center justify-center h-[310px] text-gray-500">
        표시할 성적 데이터가 없습니다.
      </div>
    ),
    []
  );

  // 차트 존재 여부를 메모이제이션
  const hasChartData = useMemo(
    () =>
      chartData.categories.length > 0 &&
      !chartData.categories.includes("데이터 없음"),
    [chartData.categories]
  );

  if (loading) {
    return LoadingComponent;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            학기별 성적 통계
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            학기별 평균 학점과 이수 학점 현황
          </p>
        </div>
        {/* <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div> */}
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          {hasChartData ? (
            <Chart
              options={chartOptions}
              series={chartData.series}
              type="area"
              height={310}
            />
          ) : (
            EmptyDataComponent
          )}
        </div>
      </div>
    </div>
  );
}
