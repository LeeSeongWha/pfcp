import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdmissionYearChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center text-gray-500">
                입학년도별 데이터가 없습니다.
            </div>
        );
    }

    const labels = data.map(item => item.ADMISSION_YEAR);
    const values = data.map(item => item.COUNT);

    const maxDataValue = Math.max(...values);
    const maxYAxis = Math.ceil(maxDataValue / 10) * 10 + 10;

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '입학년도별 학생 수',
                data: values,
                fill: true,
                backgroundColor: 'rgba(30, 144, 255, 0.15)',
                borderColor: 'rgba(25, 118, 210, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(25, 118, 210, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(25, 118, 210, 1)',
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '입학년도별 학생 수',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        return label + context.parsed.y + '명';
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxYAxis,
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center">
            <div style={{ width: '100%', height: '350px' }}>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default AdmissionYearChart;
