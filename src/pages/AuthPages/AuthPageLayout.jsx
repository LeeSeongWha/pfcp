import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 z-1 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-transparent sm:p-0">
        {/* 왼쪽 로그인 폼 영역 */}
        <div className="flex items-center justify-center w-full h-full lg:w-1/2 p-8">
          {children}
        </div>

        {/* 오른쪽 사이드 패널 - 사이버 강의실 테마 */}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-600 dark:from-gray-800 dark:via-blue-900 dark:to-indigo-900 lg:flex relative overflow-hidden order-last">
          {/* 배경 패턴 */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute top-32 right-20 w-24 h-24 border border-white/15 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/10 rounded-full"></div>
            <div className="absolute bottom-32 right-10 w-20 h-20 border border-white/25 rounded-full"></div>

            {/* 격자 패턴 */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="relative flex items-center justify-center z-10 px-12">
            <div className="flex flex-col items-center max-w-md text-center">
              {/* 로고/아이콘 영역 */}
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>

              {/* 텍스트 컨텐츠 */}
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                사이버 강의실에
                <br />
                오신 것을 환영합니다
              </h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">
                언제 어디서나 접속 가능한 온라인 학습 플랫폼으로 새로운 교육
                경험을 시작하세요
              </p>

              {/* 특징 아이콘들 */}
              <div className="flex space-x-6 text-white/80">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs">온라인 강의</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs">24/7 접속</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs">학습 관리</span>
                </div>
              </div>
            </div>
          </div>

          {/* 플로팅 요소들 */}
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* 테마 토글러 */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white/20 transition-all duration-200">
            <svg
              className="w-5 h-5 text-gray-600 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
