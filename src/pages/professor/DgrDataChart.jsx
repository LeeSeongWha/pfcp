import React from 'react';

const dgrDataChart = ({ dgrData }) => {
    if (!dgrData || dgrData.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mt-8 text-gray-700">
                <p>졸업 요건 데이터가 없습니다.</p>
            </div>
        );
    }

    const data = dgrData[0];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">학과 졸업 요건</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">총 졸업 이수 학점</p>
                    <p className="text-xl font-bold text-blue-800">{data.DGR_GRADE || 0}점</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">전공 이수 학점</p>
                    <p className="text-xl font-bold text-green-800">{data.DGR_MC || 0}점</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">교양 이수 학점</p>
                    <p className="text-xl font-bold text-yellow-800">{data.DGR_LAC || 0}점</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">자유 이수 학점</p>
                    <p className="text-xl font-bold text-purple-800">{data.DGR_FCC || 0}점</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-600 text-lg">봉사 시간</p>
                    <p className="text-xl font-bold text-red-800">{data.DGR_VOLUNTEER_HOUR || 0}시간</p>
                </div>
            </div>
        </div>
    );
};

export default dgrDataChart;