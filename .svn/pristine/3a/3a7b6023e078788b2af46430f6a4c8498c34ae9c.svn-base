import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grade34AttChart = ({ data }) => {
    const filteredData = data.filter(item => item.학년 === 3 || item.학년 === 4);
    const labels = [...new Set(filteredData.map(item => item.강의명))].sort();
    const dataPre2025 = labels.map(name => {
        const item = filteredData.find(d => d.강의명 === name);
        return item ? item['2025년_이전_평균_출석률'] : null;
    });
    const data2025 = labels.map(name => {
        const item = filteredData.find(d => d.강의명 === name);
        return item ? item['2025년_평균_출석률'] : null;
    });

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '3-4학년 과목별 출석률 평균 (2025년 이전 vs 2025년)',
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
                    text: '과목명',
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45
                }
            },
            y: {
                title: {
                    display: true,
                    text: '출석률 (%)',
                },
                beginAtZero: true,
                max: 100,
            },
        },
    };

    const dataForChart = {
        labels,
        datasets: [
            {
                label: '2025년 이전 평균',
                data: dataPre2025,
                backgroundColor: 'rgba(129, 140, 248, 0.5)',
                borderColor: 'rgba(129, 140, 248, 1)',
                borderWidth: 1,
            },
            {
                label: '2025년 평균',
                data: data2025,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    const hasData = labels.length > 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">3-4학년 과목별 출석 현황</h3>
            {hasData ? (
                <Bar options={chartOptions} data={dataForChart} />
            ) : (
                <p className="text-gray-600">3-4학년 과목 출석 데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default Grade34AttChart;