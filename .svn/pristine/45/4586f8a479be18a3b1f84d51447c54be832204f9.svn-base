import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentStdChart = ({ gradeData }) => {
    if (!gradeData || gradeData.length === 0) {
        return (
            <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center text-gray-500">
                학년별 데이터가 없습니다.
            </div>
        );
    }

    const labels = gradeData.map(item => `${item.STUDENT_GRADE}학년`);
    const counts = gradeData.map(item => item.COUNT);

    const data = {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: [
                    'rgba(112, 66, 209, 0.6)',
                    'rgba(153, 51, 255, 0.6)',
                    'rgba(51, 102, 255, 0.5)',
                    'rgba(0, 153, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(85, 45, 160, 1)',
                    'rgba(120, 40, 200, 1)',
                    'rgba(40, 80, 200, 1)',
                    'rgba(0, 120, 200, 1)',
                ],
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
                        const currentGradesTotal = counts.reduce((sum, current) => sum + current, 0);
                        const percentage = ((value / currentGradesTotal) * 100).toFixed(1);
                        return label + value + `명 (${percentage}%)`;
                    }
                }
            },
        },
        cutout: '50%',
    };

    return (
        <div className="bg-white p-6 rounded shadow h-full flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">학년별 학생 분포</h2>
            <div style={{ width: '100%', maxWidth: '400px', height: '300px' }}>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default DepartmentStdChart;