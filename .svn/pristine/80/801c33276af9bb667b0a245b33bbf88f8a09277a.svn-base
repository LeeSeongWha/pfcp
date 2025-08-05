import React from 'react';

const LectureGradeAvg = ({ data }) => {
    const gradeAvgData = data?.gradeAvgData || [];

    let totalGradeSum = 0;
    let gradeCount = 0;

    gradeAvgData.forEach(item => {
        if (item.AVERAGE_GRADE_POINT_BY_STUDENT_GRADE !== undefined && item.AVERAGE_GRADE_POINT_BY_STUDENT_GRADE !== null) {
            totalGradeSum += item.AVERAGE_GRADE_POINT_BY_STUDENT_GRADE;
            gradeCount++;
        }
    });

    const overallDepartmentAverage = gradeCount > 0 ? (totalGradeSum / gradeCount).toFixed(2) : 'N/A';

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">학생 현재 학년별 평균 및 학과 전체 평균</h3>
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-indigo-100 p-6 rounded-lg shadow col-span-2">
                    <p className="text-indigo-700 text-2xl">학과 전체 평균</p>
                    <p className="text-3xl font-bold text-indigo-900">{overallDepartmentAverage}점</p>
                </div>

                {gradeAvgData.length > 0 ? (
                    gradeAvgData.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded shadow">
                            <p className="text-gray-500 text-2xl">{item.STUDENT_GRADE}학년 평균</p>
                            <p className="text-2xl font-bold">{item.AVERAGE_GRADE_POINT_BY_STUDENT_GRADE}점</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-2">
                        <p className="text-gray-600">학년별 평균 데이터가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LectureGradeAvg;