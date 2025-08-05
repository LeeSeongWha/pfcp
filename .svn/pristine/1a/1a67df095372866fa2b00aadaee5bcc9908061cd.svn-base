import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderChart = ({ genderData }) => {
    if (!genderData || genderData.length === 0) {
        return (
            <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center text-gray-500">
                성별 데이터가 없습니다.
            </div>
        );
    }

    const labels = genderData.map(item => {
        if (item.GENDER === 'M' || item.GENDER === '남') return '남성';
        if (item.GENDER === 'W' || item.GENDER === '여') return '여성';
        return item.GENDER;
    });

    const counts = genderData.map(item => item.STUDENT_COUNT);

    const backgroundColors = genderData.map(item => {
        if (item.GENDER === 'M' || item.GENDER === '남') return 'rgba(54, 162, 235, 0.6)';
        if (item.GENDER === 'W' || item.GENDER === '여') return 'rgba(255, 99, 132, 0.6)';
        return '#CBD5E0';
    });

    const borderColors = genderData.map(item => {
        if (item.GENDER === 'M' || item.GENDER === '남') return 'rgba(54, 162, 235, 1)';
        if (item.GENDER === 'W' || item.GENDER === '여') return 'rgba(255, 99, 132, 1)';
        return '#A0AEC0';
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        const value = context.parsed;
                        const total = counts.reduce((sum, current) => sum + current, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return label + value + `명 (${percentage}%)`;
                    }
                }
            },
        },
        cutout: '0%',
        startAngle: 0,
    };

    return (
        <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">학과 남/여 성비</h2>
            <div style={{ width: '100%', maxWidth: '400px', height: '300px' }}>
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
};

export default GenderChart;