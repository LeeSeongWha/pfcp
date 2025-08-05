import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalYearCreateLecChart = ({ data }) => {
    const labels = data.map(item => `${item.LECTUREYEAR}년 ${item.SEMESTER}학기`);
    const chartData = data.map(item => item.NUMBEROFLECTURESOPENED);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '연도별/학기별 개설 강의 수',
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
            },
            y: {
                title: {
                    display: true,
                    text: '개설 강의 수 (개)',
                },
                beginAtZero: true,
            },
        },
    };

    const dataForChart = {
        labels,
        datasets: [
            {
                label: '개설 강의 수',
                data: chartData,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">연도별/학기별 개설 강의 현황</h3>
            {data.length > 0 ? (
                <Bar options={chartOptions} data={dataForChart} />
            ) : (
                <p className="text-gray-600">데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default TotalYearCreateLecChart;