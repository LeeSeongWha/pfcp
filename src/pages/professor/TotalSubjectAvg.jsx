import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SubjectGradeChart = ({ title, data, chartRef }) => {
    useEffect(() => {
        if (data.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (!ctx) return;

            if (Chart.getChart(ctx)) {
                Chart.getChart(ctx).destroy();
            }

            const allLectureNames = [...new Set(data.map(item => item.LECTURE_NAME))].sort();

            const before2025Data = allLectureNames.map(name => {
                const item = data.find(
                    (d) => d.LECTURE_NAME === name && d.YEAR_CATEGORY === '2025년 이전 평균'
                );
                return item ? parseFloat(item.AVERAGE_GRADE_POINT) : null;
            });

            const after2025Data = allLectureNames.map(name => {
                const item = data.find(
                    (d) => d.LECTURE_NAME === name && d.YEAR_CATEGORY === '2025 평균'
                );
                return item ? parseFloat(item.AVERAGE_GRADE_POINT) : null;
            });

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: allLectureNames,
                    datasets: [
                        {
                            label: '2025년 이전 평균',
                            data: before2025Data,
                            backgroundColor: 'rgba(129, 140, 248, 0.7)',
                            borderColor: 'rgba(129, 140, 248, 1)',
                            borderWidth: 1,
                            barPercentage: 0.4,
                            categoryPercentage: 0.8
                        },
                        {
                            label: '2025 평균',
                            data: after2025Data,
                            backgroundColor: 'rgba(59, 130, 246, 0.7)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1,
                            barPercentage: 0.4,
                            categoryPercentage: 0.8
                        },
                    ],
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
                                text: '강의 이름'
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 90,
                                minRotation: 60,
                                font: {
                                    size: 10
                                }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: '평균 성적 (4.5 만점)'
                            },
                            beginAtZero: true,
                            max: 4.5,
                            ticks: {
                                stepSize: 0.5
                            }
                        }
                    }
                }
            });
        }
    }, [data, chartRef, title]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
            {data.length === 0 ? (
                <p className="text-gray-600">데이터가 없습니다.</p>
            ) : (
                <div style={{ height: '400px' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            )}
        </div>
    );
};

const TotalSubjectAvg = ({ data }) => {
    const totalSubjectData = data?.totalSubjectData || [];

    const freshmanSophomoreData = totalSubjectData.filter(item =>
        item.GRADE_LEVEL === 1 || item.GRADE_LEVEL === 2
    );

    const juniorSeniorData = totalSubjectData.filter(item =>
        item.GRADE_LEVEL === 3 || item.GRADE_LEVEL === 4
    );

    const chartRef12 = useRef(null);
    const chartRef34 = useRef(null);

    return (
        <>
            <SubjectGradeChart
                title="1-2학년 과목별 연도별 평균 성적"
                data={freshmanSophomoreData}
                chartRef={chartRef12}
            />
            <SubjectGradeChart
                title="3-4학년 과목별 연도별 평균 성적"
                data={juniorSeniorData}
                chartRef={chartRef34}
            />
        </>
    );
};

export default TotalSubjectAvg;