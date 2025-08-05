import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Document, Page } from "react-pdf";
import axios from "axios";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.js`;

const API_BASE_URL = import.meta.env.VITE_AXIOS_API_BASE_URL;

const ExamDetail = () => {
  const param = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examNo, setExamNo] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [examLimit, setExamLimit] = useState("");

  const handleSubmit = async () => {
    try {
      const userNo = param.userNo;

      console.log("제출 전 확인 →", { examNo, userNo, answers });;

      const response = await axios.post(`${API_BASE_URL}/exam/submit`, {
        examNo,
        userNo,
        answers,
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      alert(`제출 완료! 점수: ${response.data.score}`);

      history.back();
    } catch (error) {
      console.error("제출 실패:", error);
      alert("제출에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchExamNo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/exam/no`, {
          params: {
            examName: param.examName,
            lecNo: param.lectureName
          },
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        console.log("체킁 :", response);

        const fetchedExamNo = response.data.examNo;
        setExamNo(fetchedExamNo);

        // exam 상세 정보 가져오기 (examLimit 포함)
        const detail = await axios.get(`${API_BASE_URL}/exam/${fetchedExamNo}`);
        console.log("체크킁 :", detail.data);
        setExamLimit(detail.data.examLimit);

        const url = `${API_BASE_URL}/exam/${fetchedExamNo}/pdf`;
        
        setPdfUrl(url);

        const countRes = await axios.get(`${API_BASE_URL}/exam/question-count?examNo=${fetchedExamNo}`);
        setQuestionCount(countRes.data.questionCount);

      } catch (error) {
        console.error("examNo 조회 에러:", error);
      }
    };

    fetchExamNo();
  }, [param.examName]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (examNo && param.userNo) {
      axios.post(`${API_BASE_URL}/exam/start`, null, {
        params: { userNo: param.userNo, examNo }
      }).then(res => {
        setStartTime(new Date(res.data.startTime));
      });
    }
  }, [examNo]);

  useEffect(() => {
    if (!startTime || !examLimit) return;
    const limitMinutes = parseInt(examLimit.replace(/[^0-9]/g, ""), 10);
    const limitMs = limitMinutes * 60 * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.getTime();
      const remaining = limitMs - elapsed;
      if (remaining <= 0) {
        clearInterval(interval);
        handleSubmit();
      } else {
        setRemainingTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, examLimit]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // 진행률 계산
  const progressPercentage = questionCount > 0 ? (Object.keys(answers).length / questionCount) * 100 : 0;

  return (
    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-800 dark:bg-white/[0.03] h-[750px]">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="text-2xl font-bold">{param.examName}</h1>
        <div style={{ fontWeight: "bold", color: "red" }}>
          남은 시간: {remainingTime !== null ? formatTime(remainingTime) : "계산 중..."}
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          제출하기
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          height: "95%",
          width: "100%",
        }}
      >
        {/* PDF 컨테이너 */}
        <div
          style={{
            height: "90%",
            width: "70%",
            overflow: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",

          }}
        >
          {pdfUrl ? (
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
                <div key={index}>
                  <Page
                    pageNumber={index + 1}
                    scale={1.5}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              ))}
            </Document>
          ) : (
            <p>PDF를 불러오는 중...</p>
          )}
        </div>

        {/* 답안지 컨테이너 */}
        <div
          style={{
            height: "90%",
            width: "30%",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            border: "2px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            flex: 1,
            position: "relative",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)"
          }}
        >
          {/* 상단 그라데이션 바 */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
              borderRadius: "16px 16px 0 0"
            }}
          />

          {/* 진행률 표시 */}
          <div
            style={{
              position: "sticky",
              top: 0,
              background: "white",
              padding: "16px",
              borderBottom: "1px solid #e2e8f0",
              borderRadius: "16px 16px 0 0",
              zIndex: 10,
              marginTop: "4px"
            }}
          >
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#f1f5f9",
                borderRadius: "3px",
                overflow: "hidden",
                marginBottom: "8px"
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercentage}%`,
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  borderRadius: "3px",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
                textAlign: "center",
                fontWeight: "500"
              }}
            >
              {Object.keys(answers).length}/{questionCount} 완료
            </div>
          </div>

          {/* 스크롤 가능한 문제 영역 */}
          <div
            style={{
              height: "calc(100% - 80px)",
              overflowY: "auto",
              padding: "20px",
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f1f5f9"
            }}
          >
            <style>
              {`
                .answer-container::-webkit-scrollbar {
                  width: 8px;
                }
                .answer-container::-webkit-scrollbar-track {
                  background: #f1f5f9;
                  border-radius: 8px;
                }
                .answer-container::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #cbd5e1, #94a3b8);
                  border-radius: 8px;
                  border: 2px solid #f1f5f9;
                }
                .answer-container::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #94a3b8, #64748b);
                }
              `}
            </style>

            {Array.from({ length: questionCount }, (_, index) => {
              const questionNum = index + 1;
              const isAnswered = answers[questionNum] !== undefined;

              return (
                <div
                  key={questionNum}
                  style={{
                    background: isAnswered
                      ? "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
                      : "white",
                    border: `1px solid ${isAnswered ? "#22c55e" : "#e2e8f0"}`,
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#1e293b",
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: isAnswered ? "#22c55e" : "#3b82f6",
                        borderRadius: "50%",
                        boxShadow: isAnswered ? "0 0 0 3px rgba(34, 197, 94, 0.2)" : "none"
                      }}
                    />
                    문제 {questionNum}
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px"
                    }}
                  >
                    {[1, 2, 3, 4].map((choice) => {
                      const isSelected = answers[questionNum] === choice;

                      return (
                        <label
                          key={choice}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 12px",
                            border: `2px solid ${isSelected ? "#3b82f6" : "#e2e8f0"}`,
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            background: isSelected
                              ? "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)"
                              : "white",
                            fontWeight: isSelected ? "600" : "500",
                            color: isSelected ? "#1e40af" : "#475569",
                            position: "relative",
                            overflow: "hidden"
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.target.style.borderColor = "#3b82f6";
                              e.target.style.background = "#f8fafc";
                              e.target.style.transform = "scale(1.02)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.target.style.borderColor = "#e2e8f0";
                              e.target.style.background = "white";
                              e.target.style.transform = "scale(1)";
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${questionNum}`}
                            value={choice}
                            checked={isSelected}
                            onChange={() =>
                              setAnswers((prev) => ({ ...prev, [questionNum]: choice }))
                            }
                            style={{
                              appearance: "none",
                              width: "18px",
                              height: "18px",
                              border: `2px solid ${isSelected ? "#3b82f6" : "#cbd5e1"}`,
                              borderRadius: "50%",
                              position: "relative",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              flexShrink: 0,
                              background: isSelected ? "#3b82f6" : "transparent",
                              boxShadow: isSelected ? "0 0 0 3px rgba(59, 130, 246, 0.2)" : "none"
                            }}
                          />
                          {isSelected && (
                            <div
                              style={{
                                position: "absolute",
                                left: "18px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "8px",
                                height: "8px",
                                background: "white",
                                borderRadius: "50%",
                                pointerEvents: "none"
                              }}
                            />
                          )}
                          <span style={{ marginLeft: isSelected ? "10px" : "0" }}>
                            {choice}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};


export default ExamDetail;
