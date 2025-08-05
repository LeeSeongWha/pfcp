import React from 'react';

const LectureMainStats = ({ totalLecture, totalLectureEvalAvg, totalStdAvg, onSelectTab, selectedTab }) => {
    const totalLecturesOpened = totalLecture?.[0]?.TOTALLECTURESOPENED || 0;
    const averageLectureSatisfaction = totalLectureEvalAvg?.[0]?.AVERAGELECTURESATISFACTION || 0;
    const overallAverageAttendanceRate = totalStdAvg?.[0]?.OVERALLAVERAGEATTENDANCERATE || 0;

    const handleCardClick = (tabName) => {
        if (onSelectTab) {
            onSelectTab(tabName);
        }
    };

    const getCardClasses = (tabName) => {
        let baseBgColor = 'bg-white';
        let baseTextColor = 'text-gray-500';
        let boldTextColor = 'text-gray-900';

        if (tabName === 'totalLecture') {
            baseBgColor = 'bg-blue-100';
            baseTextColor = 'text-blue-700';
            boldTextColor = 'text-blue-900';
        } else if (tabName === 'totalLectureEvalAvg') {
            baseBgColor = 'bg-green-100';
            baseTextColor = 'text-green-700';
            boldTextColor = 'text-green-900';
        } else if (tabName === 'totalStdAvg') {
            baseBgColor = 'bg-purple-100';
            baseTextColor = 'text-purple-700';
            boldTextColor = 'text-purple-900';
        }

        const commonClasses = `p-6 rounded-lg shadow cursor-pointer transition-all duration-300`;

        const selectedClasses = selectedTab === tabName
            ? 'ring-2 ring-[#2F3B85] scale-105'
            : 'hover:scale-105 hover:shadow-lg';

        return {
            card: `${commonClasses} ${baseBgColor} ${selectedClasses}`,
            text: baseTextColor,
            boldText: boldTextColor
        };
    };

    const totalLectureCardClasses = getCardClasses('totalLecture');
    const totalLectureEvalAvgCardClasses = getCardClasses('totalLectureEvalAvg');
    const totalStdAvgCardClasses = getCardClasses('totalStdAvg');

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">강의/출석 전체 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={totalLectureCardClasses.card} onClick={() => handleCardClick('totalLecture')}>
                    <p className={`${totalLectureCardClasses.text} text-xl`}>총 개설 강의 수</p>
                    <p className={`${totalLectureCardClasses.boldText} text-3xl font-bold`}>{totalLecturesOpened}개</p>
                </div>

                <div className={totalLectureEvalAvgCardClasses.card} onClick={() => handleCardClick('totalLectureEvalAvg')}>
                    <p className={`${totalLectureEvalAvgCardClasses.text} text-xl`}>강의 평가 평균 만족도</p>
                    <p className={`${totalLectureEvalAvgCardClasses.boldText} text-3xl font-bold`}>{averageLectureSatisfaction}점</p>
                </div>

                <div className={totalStdAvgCardClasses.card} onClick={() => handleCardClick('totalStdAvg')}>
                    <p className={`${totalStdAvgCardClasses.text} text-xl`}>전체 학생 평균 출석률</p>
                    <p className={`${totalStdAvgCardClasses.boldText} text-3xl font-bold`}>{overallAverageAttendanceRate}%</p>
                </div>
            </div>
        </div>
    );
};

export default LectureMainStats;