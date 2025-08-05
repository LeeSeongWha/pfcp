import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DgrStatusChart = ({ dgrStatusData }) => {
    if (!dgrStatusData || dgrStatusData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mt-8 text-gray-700">
                <p>졸업 상태 데이터가 없습니다.</p>
            </div>
        );
    }

    let totalStudentCount = 0;
    const chartDisplayData = [];

    dgrStatusData.forEach(item => {
        if (item.GRADUATION_STATUS_CATEGORY === '총 학생 수') {
            totalStudentCount = item.STUDENT_COUNT;
        } else {
            chartDisplayData.push(item);
        }
    });

    const orderMap = {
        '총 학생 수': 0,
        '졸업 대상': 1,
        '졸업 예정자': 2,
        '졸업 보류 대상': 3,
        '졸업 요건 미충족': 4,
    };

    const sortedTextDisplayData = [
        { GRADUATION_STATUS_CATEGORY: '총 학생 수', STUDENT_COUNT: totalStudentCount },
        ...chartDisplayData.sort((a, b) => {
            return (orderMap[a.GRADUATION_STATUS_CATEGORY] || 99) - (orderMap[b.GRADUATION_STATUS_CATEGORY] || 99);
        })
    ];


    const labels = chartDisplayData.map(item => item.GRADUATION_STATUS_CATEGORY);
    const counts = chartDisplayData.map(item => item.STUDENT_COUNT);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: counts,
                backgroundColor: [

                    'rgba(51, 102, 255, 0.7)',
                    'rgba(0, 153, 255, 0.7)',
                    'rgba(153, 51, 255, 0.7)',
                ],
                borderColor: [

                    'rgba(40, 80, 200, 1)',
                    'rgba(0, 120, 200, 1)',
                    'rgba(120, 40, 200, 1)',
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
                position: 'right',
                labels: {
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw;
                        const total = context.dataset.data.reduce((acc, current) => acc + current, 0);
                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) + '%' : '0.0%';
                        return `${label}: ${value}명 (${percentage})`;
                    }
                }
            }
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">졸업 진행 상태</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* 텍스트 표시 영역 */}
                <div>
                    {sortedTextDisplayData.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-3">
                            <p className="text-gray-600 text-lg">{item.GRADUATION_STATUS_CATEGORY}</p>
                            <p className="text-xl font-bold text-gray-800">{item.STUDENT_COUNT}명</p>
                        </div>
                    ))}
                </div>
                <div style={{ height: '300px' }}>
                    {labels.length > 0 ? (
                        <Doughnut data={chartData} options={options} />
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            차트 표시를 위한 충분한 데이터가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DgrStatusChart;