import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/jobs/card";
import { Badge } from "../../components/ui/jobs/badge";
import { Button } from "../../components/ui/jobs/button";
import {
  BarChart3,
  Briefcase,
  Calendar,
  Plus,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const JobList2 = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pageSize = 10; // 페이지당 10개씩

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/ajax/recruit/search?page=${page}&pageSize=${pageSize}&sort=RD`,
        {
          withCredentials: true,
        }
      );

      console.log("받아온 데이터:", response.data);
      const data = response.data;

      // API 응답 구조에 따라 data 배열 추출
      const result = Array.isArray(data.data) ? data.data : [];

      setJobs(result);

      if (result.length === 0 && page === 1) {
        console.warn("예상치 못한 데이터 구조:", data);
      }
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "미정";
    return dateString.split(" ")[0]; // "2025-08-27 00:00:00" -> "2025-08-27"
  };

  // 지역 정보 포맷팅 함수
  const formatLocation = (cityName, districtName) => {
    if (cityName && districtName) {
      return `${cityName} ${districtName}`;
    }
    return cityName || "위치 미정";
  };

  // 카드 클릭 핸들러
  const handleCardClick = (recruitmentNo) => {
    navigate(`/jobs/jobsPostDetail/${recruitmentNo}`);
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setCurrentPage(newPage);
    }
  };

  // 페이지 번호 생성 함수
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    // 다음 페이지가 없으면 현재 페이지까지만 표시
    if (!hasNextPage && currentPage < endPage) {
      endPage = currentPage;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      {/* Recent Jobs */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-800" />
              최근 등록된 공고
            </CardTitle>
            <CardDescription>
              최근에 등록된 취업 공고 목록입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">공고를 불러오는 중...</p>
              </div>
            ) : jobs.length > 0 ? (
              <>
                {jobs.map((job) => (
                  <div
                    key={job.recruitmentNo}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors bg-gray-50 cursor-pointer hover:shadow-md transform hover:scale-[1.02] transition-all duration-200"
                    onClick={() => handleCardClick(job.recruitmentNo)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1 hover:text-blue-600 transition-colors">
                          {job.recruitmentTitle}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          {job.comLogo && (
                            <img
                              src={job.comLogo}
                              alt={job.comName}
                              className="w-6 h-6 rounded object-cover"
                            />
                          )}
                          <p className="text-sm text-muted-foreground">
                            {job.comName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 ml-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          {job.jobName}
                        </Badge>
                        {job.recruitmentSalary && (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-300"
                          >
                            {parseInt(job.recruitmentSalary).toLocaleString()}
                            만원
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span>
                        {formatLocation(job.cityName, job.districtName)}
                      </span>
                      <span>•</span>
                      <span>{job.yearCodeName || "경력무관"}</span>
                      <span>•</span>
                      <span>
                        {job.education?.recruitmentEducationCodeName ||
                          "학력무관"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>조회수: {job.viewCnt}</span>
                        <span>•</span>
                        <span>스크랩: {job.scrabCnt}</span>
                      </div>
                      <span className="text-sm text-red-500 font-medium">
                        마감: {formatDate(job.recruitmentFinishDate)}
                      </span>
                    </div>

                    {/* 기술 스택 표시 (있는 경우) */}
                    {job.skillList && job.skillList.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {job.skillList.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={skill.recruitSkillCode || index}
                            variant="outline"
                            className="text-xs bg-gray-100"
                          >
                            {skill.recruitSkillName}
                          </Badge>
                        ))}
                        {job.skillList.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-100"
                          >
                            +{job.skillList.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">채용공고가 없습니다.</p>
              </div>
            )}

            <div className="pt-4">
              <Link to="/jobs/jobsListDetail">
                <Button
                  variant="outline"
                  className="w-full hover:bg-orange-300 transition-colors"
                >
                  모든 공고 보기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default JobList2;
