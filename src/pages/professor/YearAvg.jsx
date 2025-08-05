import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const YearAvg = ({ data }) => {
    const chartRef = useRef(null);
    const yearSemesterData = data?.yearSubjectData || [];

    useEffect(() => {
        if (yearSemesterData.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (!ctx) return;
            if (Chart.getChart(ctx)) {
                Chart.getChart(ctx).destroy();
            }

            const gradesMap = new Map();
            yearSemesterData.forEach(item => {
                const gradeLevel = item.GRADE_LEVEL;
                if (!gradesMap.has(gradeLevel)) {
                    gradesMap.set(gradeLevel, { '1': null, '2': null });
                }
                gradesMap.get(gradeLevel)[item.SEMESTER] = parseFloat(item.AVERAGE_GRADE_POINT_BY_SEMESTER);
            });

            const labels = ['1학년', '2학년', '3학년', '4학년'];
            const avg1stSemester = labels.map(label => {
                const gradeLevel = parseInt(label.replace('학년', ''));
                return gradesMap.has(gradeLevel) ? gradesMap.get(gradeLevel)['1'] : null;
            });

            const avg2ndSemester = labels.map(label => {
                const gradeLevel = parseInt(label.replace('학년', ''));
                return gradesMap.has(gradeLevel) ? gradesMap.get(gradeLevel)['2'] : null;
            });

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: '1학기 평균',
                            data: avg1stSemester,
                            backgroundColor: 'rgba(129, 140, 248, 0.5)',
                            borderColor: 'rgba(129, 140, 248, 1)',
                            borderWidth: 1
                        },
                        {
                            label: '2학기 평균',
                            data: avg2ndSemester,
                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            align: 'start',
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: '학년'
                            },
                            stacked: false
                        },
                        y: {
                            beginAtZero: true,
                            max: 4.5,
                            ticks: {
                                stepSize: 0.5
                            },
                            title: {
                                display: true,
                                text: '평균 성적 (4.5 만점)'
                            }
                        }
                    }
                }
            });
        }
    }, [yearSemesterData]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">학년별 학기별 성적 평균</h3>
            {yearSemesterData.length === 0 ? (
                <p className="text-gray-600">데이터가 없습니다.</p>
            ) : (
                <div style={{ height: '400px' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            )}
        </div>
    );
};

export default YearAvg;