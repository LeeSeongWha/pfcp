import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllEvalAttAvgChart = ({ allEvalAvg, allAttAvg }) => {
    const mergedDataMap = new Map();

    allEvalAvg.forEach(item => {
        mergedDataMap.set(item.강의명, {
            ...mergedDataMap.get(item.강의명),
            eval_2025_이전: item['2025년_이전_평균_점수'],
            eval_2025: item['2025년_평균_점수']
        });
    });

    allAttAvg.forEach(item => {
        mergedDataMap.set(item.강의명, {
            ...mergedDataMap.get(item.강의명),
            att_2025_이전: item['2025년_이전_평균_출석률'],
            att_2025: item['2025년_평균_출석률']
        });
    });

    const labels = Array.from(mergedDataMap.keys()).sort();

    const evalData2025이전 = labels.map(label => mergedDataMap.get(label)?.eval_2025_이전 || null);
    const evalData2025 = labels.map(label => mergedDataMap.get(label)?.eval_2025 || null);
    const attData2025이전 = labels.map(label => mergedDataMap.get(label)?.att_2025_이전 || null);
    const attData2025 = labels.map(label => mergedDataMap.get(label)?.att_2025 || null);


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '과목별 강의평가 및 출석률 비교 (2025년 이전 vs 2025년)',
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
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: '강의평가 점수 (점)',
                },
                grid: {
                    drawOnChartArea: false,
                },
                beginAtZero: true,
                max: 25,
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: '출석률 (%)',
                },
                beginAtZero: true,
                max: 100,
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const dataForChart = {
        labels,
        datasets: [
            {
                label: '강의평가 (2025년 이전)',
                data: evalData2025이전,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y',
            },
            {
                label: '강의평가 (2025년)',
                data: evalData2025,
                backgroundColor: 'rgba(75, 192, 192, 0.9)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y',
            },
            {
                label: '출석률 (2025년 이전)',
                data: attData2025이전,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
            },
            {
                label: '출석률 (2025년)',
                data: attData2025,
                backgroundColor: 'rgba(153, 102, 255, 0.9)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
            },
        ],
    };

    const hasData = labels.length > 0;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">과목별 강의평가 및 출석률 비교</h3>
            {hasData ? (
                <Bar options={chartOptions} data={dataForChart} />
            ) : (
                <p className="text-gray-600">데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default AllEvalAttAvgChart;