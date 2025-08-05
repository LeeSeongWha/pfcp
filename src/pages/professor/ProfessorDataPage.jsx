import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataNavigationTabs from '../../components/professor/DataNavigationTabs';

import AdmissionYearChart from './AdmissionYearChart';
import DepartmentStdChart from './DepartmentStdChart';

import GenderChart from './GenderChart';
import ProfessorCntChart from './ProfessorCntChart';

import DgrDataChart from './dgrDataChart';
import DgrStatusChart from './dgrStatusChart';

import TotalSubjectAvg from './TotalSubjectAvg';
import YearAvg from './YearAvg';
import LectureGradeAvg from './LectureGradeAvg';

import LectureMainStats from './LectureMainStats';
import TotalYearCreateLecChart from './TotalYearCreateLecChart';
import SemesterEvalAvgChart from './SemesterEvalAvgChart';
import SemesterAttAvgChart from './SemesterAttAvgChart';

import Grade12EvalChart from './Grade12EvalChart';
import Grade34EvalChart from './Grade34EvalChart';

import Grade12AttChart from './Grade12AttChart';
import Grade34AttChart from './Grade34AttChart';

const ProfessorDataPage = () => {
    const [professorData, setProfessorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMainTab, setSelectedMainTab] = useState('profData');
    const [currentSubPageIndex, setCurrentSubPageIndex] = useState(0);
    const [selectedLectureStatTab, setSelectedLectureStatTab] = useState('totalLecture');

    const [selectedDepartmentNo, setSelectedDepartmentNo] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('departmentNo') || 'DP001';
    });

    const departmentPages = [
        {
            id: 'deptMain',
            title: '학과 현황',
            component: (data) => (
                <>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-500 text-2xl">총 학생 수(명)</p>
                            <p className="text-2xl font-bold">{data.totalStd?.[0] || 0}명</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-500 text-2xl">재학생 수</p>
                            <p className="text-2xl font-bold">{data.currentStd?.[0] || 0}명</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-500 text-2xl">졸업생 수</p>
                            <p className="text-2xl font-bold">{data.gradStd?.[0] || 0}명</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow">
                            <p className="text-gray-500 text-2xl">휴학생 수</p>
                            <p className="text-2xl font-bold">{data.leaveStd?.[0] || 0}명</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <ProfessorCntChart professorData={data.professorData || []} />
                        <DepartmentStdChart gradeData={data.gradeCnt || []} />
                        <GenderChart genderData={data.genderData || []} />

                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-8">
                        <AdmissionYearChart data={data.admYearCnt || []} />
                    </div>
                </>
            )
        },
        {
            id: 'graduationStatus',
            title: '졸업 요건 현황',
            component: (data) => (
                <>
                    <DgrDataChart dgrData={data.dgrData || []} />
                    <DgrStatusChart dgrStatusData={data.dgrDataStatus || []} />
                </>
            )
        },
    ];

    const lecturePages = [
        {
            id: 'lectureMain',
            title: '강의 현황 / 출석 현황',
            component: (data) => (
                <>

                    <LectureMainStats
                        totalLecture={data.totalLecture}
                        totalLectureEvalAvg={data.totalLectureEvalAvg}
                        totalStdAvg={data.totalStdAvg}
                        onSelectTab={setSelectedLectureStatTab}
                        selectedTab={selectedLectureStatTab}
                    />


                    {selectedLectureStatTab === 'totalLecture' && (

                        <div className="flex flex-wrap justify-around items-start gap-4">
                            <div className="flex-1 min-w-[300px]">
                                <TotalYearCreateLecChart data={data.totalYearCreateLec || []} />
                            </div>
                        </div>
                    )}

                    {selectedLectureStatTab === 'totalLectureEvalAvg' && (
                        <>
                            <div className="flex flex-wrap justify-around items-start gap-4">
                                <div className="flex-1 min-w-[300px]">
                                    <SemesterEvalAvgChart data={data.semesterEvalAvg || []} />
                                </div>
                            </div>

                            <Grade12EvalChart data={data.allEvalAvg || []} />
                            <Grade34EvalChart data={data.allEvalAvg || []} />
                        </>
                    )}

                    {selectedLectureStatTab === 'totalStdAvg' && (
                        <>
                            <div className="flex flex-wrap justify-around items-start gap-4">
                                <div className="flex-1 min-w-[300px]">
                                    <SemesterAttAvgChart data={data.semesterAttAvg || []} />
                                </div>
                            </div>
                            <Grade12AttChart data={data.allAttAvg || []} />
                            <Grade34AttChart data={data.allAttAvg || []} />
                        </>
                    )}
                </>
            )
        },
        {
            id: 'gradeDistribution',
            title: '성적 분포 / 학업 분석',
            component: (data) => (
                <>
                    <LectureGradeAvg data={data} />
                    <YearAvg data={data} />
                    <TotalSubjectAvg data={data} />
                </>
            )
        },
    ];

    const currentPageList = selectedMainTab === 'profData' ? departmentPages : lecturePages;

    useEffect(() => {
        const fetchStatisticsData = async () => {
            if (!selectedDepartmentNo) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost/rest/professorData?departmentNo=${selectedDepartmentNo}`);
                setProfessorData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatisticsData();
        setCurrentSubPageIndex(0);
    }, [selectedDepartmentNo, selectedMainTab]);

    const getNextPageTitle = () => {
        const nextIndex = (currentSubPageIndex + 1) % currentPageList.length;
        return currentPageList[nextIndex].title;
    };

    const getPrevPageTitle = () => {
        const prevIndex = (currentSubPageIndex - 1 + currentPageList.length) % currentPageList.length;
        return currentPageList[prevIndex].title;
    };

    const handleNextPage = () => {
        setCurrentSubPageIndex(prevIndex => (prevIndex + 1) % currentPageList.length);
    };

    const handlePrevPage = () => {
        setCurrentSubPageIndex(prevIndex => (prevIndex - 1 + currentPageList.length) % currentPageList.length);
    };

    const handleMainTabChange = (tabName) => {
        setSelectedMainTab(tabName);
        setCurrentSubPageIndex(0);
        if (tabName === 'lecture') {
            setSelectedLectureStatTab('totalLecture');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 text-gray-700">
                데이터를 불러오는 중입니다...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 text-red-600">
                오류가 발생했습니다: {error.message}
            </div>
        );
    }

    if (!professorData) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <DataNavigationTabs onSelectTab={handleMainTabChange} activeTab={selectedMainTab} />
            <div className="flex flex-col items-center mt-8">
                <div className="flex items-center justify-center w-full">
                    <button
                        onClick={handlePrevPage}
                        className="p-2 bg-[#2F3B85] hover:bg-blue-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-4" // 제목과의 간격을 위해 mr-4 추가
                        title={`${getPrevPageTitle()}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        {currentPageList[currentSubPageIndex].title}
                    </h2>
                    <button
                        onClick={handleNextPage}
                        className="p-2 bg-[#2F3B85] hover:bg-blue-800 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ml-4" // 제목과의 간격을 위해 ml-4 추가
                        title={`${getNextPageTitle()}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="w-full px-4" style={{ minHeight: '400px' }}>
                    {currentPageList[currentSubPageIndex].component(professorData)}
                </div>
            </div>
        </div>
    );
};

export default ProfessorDataPage;