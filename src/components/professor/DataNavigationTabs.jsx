import React from 'react';

const DataNavigationTabs = ({ onSelectTab, activeTab }) => {
    return (
        <div className="grid grid-cols-2 gap-5 mb-8">
            <div
                className={`
                    p-4 text-center                                
                    transition-colors transition-transform duration-200 ease-in-out 
                    flex flex-col justify-center items-center
                    cursor-pointer
                    font-medium                                    
                    border-b-2                                     
                    hover:scale-[1.02]                             
                    ${activeTab === 'profData'
                        ? 'border-[#2F3B85]'
                        : 'border-gray-300'
                    }
                `}
                onClick={() => onSelectTab('profData')}
            >
                <h1 className={`m-0 text-xl ${activeTab === 'profData' ? 'text-[#2F3B85]' : 'text-gray-600'}`}>
                    학과 통계 / 학과 현황
                </h1>
            </div>

            <div
                className={`
                    p-4 text-center
                    transition-colors transition-transform duration-200 ease-in-out
                    flex flex-col justify-center items-center
                    cursor-pointer
                    font-medium
                    border-b-2
                    hover:scale-[1.02]
                    ${activeTab === 'lectureData'
                        ? 'border-[#2F3B85]'
                        : 'border-gray-300'
                    }
                `}
                onClick={() => onSelectTab('lectureData')}
            >
                <h1 className={`m-0 text-xl ${activeTab === 'lectureData' ? 'text-[#2F3B85]' : 'text-gray-600'}`}>
                    강의 통계 / 강의 현황
                </h1>
            </div>
        </div>
    );
};

export default DataNavigationTabs;