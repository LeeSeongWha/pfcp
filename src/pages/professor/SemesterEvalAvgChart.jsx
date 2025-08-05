import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SemesterEvalAvgChart = ({ data }) => {
    const labels = data.map(item => `${item.년도}년 ${item.학기}학기`);
    const chartData = data.map(item => item.강의평가_평균);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '연도별/학기별 강의평가 평균',
                font: {
                    size: 18,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '연도/학기',
                },
                grid: {
                    display: false,
                }
            },
            y: {
                title: {
                    display: true,
                    text: '평균 점수 (점)',
                },
                beginAtZero: true,
                max: 25,
                ticks: {
                    callback: function (value) {
                        return Number.isInteger(value) ? value : null;
                    }
                }
            },
        },
    };

    const dataForChart = {
        labels,
        datasets: [
            {
                label: '강의평가 평균',
                data: chartData,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">연도별/학기별 강의평가 현황</h3>
            {data.length > 0 ? (
                <Bar options={chartOptions} data={dataForChart} />
            ) : (
                <p className="text-gray-600">데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default SemesterEvalAvgChart;