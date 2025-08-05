import Chart from "react-apexcharts";
import ChartTab from "../../common/ChartTab";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

export default function GradeAvgChart() {
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
        `http://localhost/rest/student/statistics/gradeAvg/${user.username}`
      );
      const data = response.data;

      // 데이터 유효성 검사 강화
      if (!Array.isArray(data) || data.length === 0) {
        setChartData({
          categories: [],
          series: [
            { name: "학생 성적", data: [] },
            { name: "과목 평균", data: [] },
          ],
        });
        return;
      }

      const validData = data.filter(
        (item) =>
          item &&
          item.averageGrade !== null &&
          item.averageGrade !== undefined &&
          item.lectureName
      );

      if (validData.length === 0) {
        setChartData({
          categories: [],
          series: [
            { name: "학생 성적", data: [] },
            { name: "과목 평균", data: [] },
          ],
        });
        return;
      }

      const categories = validData.map((item) => item.lectureName || "Unknown");
      const studentGrades = validData.map((item) => {
        const grade = item.studentGrade;
        return grade !== null && grade !== undefined ? parseFloat(grade) : 0;
      });
      const averageGrades = validData.map(
        (item) => parseFloat(item.averageGrade) || 0
      );

      setChartData({
        categories,
        series: [
          {
            name: "학생 성적",
            data: studentGrades,
          },
          {
            name: "과목 평균",
            data: averageGrades,
          },
        ],
      });
    } catch (error) {
      console.error("성적 통계 조회 실패:", error);
      setChartData({
        categories: [],
        series: [
          { name: "학생 성적", data: [] },
          { name: "과목 평균", data: [] },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  // 차트 옵션을 useMemo로 메모이제이션하여 불필요한 재생성 방지
  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 310,
        toolbar: { show: false },
        fontFamily: "Outfit, sans-serif",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => {
          if (val === null || val === undefined || isNaN(val)) return "0.0";
          return parseFloat(val).toFixed(1);
        },
        style: {
          colors: ["#00000"], // 데이터 라벨 색상을 흰색으로 (가장 눈에 잘 띔)
          fontSize: "9px",
          fontWeight: "bold",
        },
        offsetY: -5, // 라벨을 막대 위쪽으로 이동
        textAnchor: "middle",
        distributed: false,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: chartData.categories || [],
        labels: {
          rotate: -30,
          style: { fontSize: "12px", colors: "#6B7280" },
        },
      },
      yaxis: {
        title: {
          text: "성적 (4.5 만점)",
          style: { fontSize: "12px" },
        },
        max: 4.5,
        min: 0,
        labels: {
          style: { fontSize: "12px", colors: "#6B7280" },
          formatter: (val) => {
            if (val === null || val === undefined || isNaN(val)) return "0.0";
            return parseFloat(val).toFixed(1);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => {
            if (val === null || val === undefined || isNaN(val))
              return "0.0 점";
            return `${parseFloat(val).toFixed(1)} 점`;
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
      },
      colors: ["#8B5CF6", "#3B82F6"],
      noData: {
        text: "표시할 데이터가 없습니다.",
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#6B7280",
          fontSize: "14px",
          fontFamily: "Outfit, sans-serif",
        },
      },
    }),
    [chartData.categories]
  );

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
      chartData.categories &&
      chartData.categories.length > 0 &&
      chartData.series &&
      chartData.series.length > 0 &&
      chartData.series.some((series) => series.data && series.data.length > 0),
    [chartData.categories, chartData.series]
  );

  if (loading) {
    return LoadingComponent;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            과목별 성적 통계
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            학생 성적과 과목 평균 성적
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
              type="bar"
              height={310}
              key={`chart-${chartData.categories.length}`} // 키 추가로 리렌더링 강제
            />
          ) : (
            EmptyDataComponent
          )}
        </div>
      </div>
    </div>
  );
}
