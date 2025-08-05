import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  RadialLinearScale,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
  RadialLinearScale ,
  ChartDataLabels
);

const ChartSection = ({ chartId, title, type, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <div style={{ height: "400px" }}><Bar data={data} options={options} /></div>;
      case "doughnut":
        return  <div style={{ height: "400px" }}>
                  <Doughnut data={data} options={options} />
                </div>;
      case "line":
        return <div style={{ height: "400px" }}><Line data={data} options={options} /></div>;
      case "radar":
        return <div style={{ height: "400px" }}><Radar data={data} options={options} /></div>;
      default:
        return <p>지원하지 않는 차트 유형입니다.</p>;
    }
  };

  return (
    <div
      id={chartId}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between min-h-[400px]"
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {data ? renderChart() : <p> 데이터 없음</p>}
    </div>
  );
};

export default ChartSection;
