import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/jobs/card";
import { Badge } from "../../components/ui/jobs/badge";
import { Button } from "../../components/ui/jobs/button";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Search,
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Bookmark,
} from "lucide-react";
import { Input } from "../../components/ui/jobs/input";

const JobListDetail = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const pageSize = 12;

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  // 검색어 변경 시 첫 페이지로 이동하고 데이터 다시 가져오기
  const handleSearch = () => {
    setCurrentPage(1);
    fetchJobs(1);
  };

  // Enter 키로 검색
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchJobs = async (page) => {
    setLoading(true);
    try {
      // 검색어가 있으면 API 파라미터에 추가
      const searchParam = searchTerm
        ? `&search=${encodeURIComponent(searchTerm)}`
        : "";

      const response = await axios.get(
        `/ajax/recruit/search?page=${page}&pageSize=${pageSize}&sort=RD${searchParam}`,
        {
          withCredentials: true,
        }
      );

      console.log("가져온 데이터:", response.data);
      const data = response.data;

      // API 응답 구조에 따라 data 배열 추출
      const result = Array.isArray(data.data) ? data.data : [];

      setJobs(result);

      // 페이징 정보 설정
      if (data.totalCount) {
        setTotalJobs(data.totalCount);
        setTotalPages(Math.ceil(data.totalCount / pageSize));
      } else {
        // 페이징 정보가 없는 경우, 현재 페이지 결과로 추정
        if (result.length < pageSize) {
          setTotalPages(page);
        } else {
          setTotalPages(page + 1);
        }
      }

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
    return dateString.split(" ")[0];
  };

  // 지역 정보 포맷팅 함수
  const formatLocation = (cityName, districtName) => {
    if (cityName && districtName) {
      return `${cityName} ${districtName}`;
    }
    return cityName || "위치 미정";
  };

  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 페이지 번호 생성 함수
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 카드 클릭 핸들러
  const handleCardClick = (recruitmentNo) => {
    navigate(`/jobs/jobsPostDetail/${recruitmentNo}`);
  };

  // 검색 초기화
  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    fetchJobs(1);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          돌아가기
        </Button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">채용 공고</h1>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground">공고를 불러오는 중...</p>
        </div>
      )}

      {/* Job Cards */}
      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {jobs.map((job) => (
            <Card
              key={job.recruitmentNo}
              className="border-0 shadow-medium hover:shadow-large transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              onClick={() => handleCardClick(job.recruitmentNo)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 hover:text-blue-600 transition-colors">
                      {job.recruitmentTitle}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-3 text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <div className="flex items-center gap-2">
                        {job.comLogo && (
                          <img
                            src={job.comLogo}
                            alt={job.comName}
                            className="w-5 h-5 rounded object-cover"
                          />
                        )}
                        {job.comName}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800"
                    >
                      {job.jobName}
                    </Badge>
                    <Badge
                      variant={
                        job.recruitFinishYn === "N" ? "default" : "outline"
                      }
                      className="text-center"
                    >
                      {job.recruitFinishYn === "N" ? "모집중" : "마감"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {formatLocation(job.cityName, job.districtName)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground text-gray-600">
                    <Briefcase className="h-4 w-4" />
                    {job.yearCodeName || "경력무관"} •{" "}
                    {job.education?.recruitmentEducationCodeName || "학력무관"}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-destructive text-red-500" />
                    <span className="text-destructive font-medium text-red-500">
                      마감: {formatDate(job.recruitmentFinishDate)}
                    </span>
                  </div>

                  {job.recruitmentSalary && (
                    <div className="text-sm font-semibold text-green-600">
                      연봉 {parseInt(job.recruitmentSalary).toLocaleString()}
                      만원
                    </div>
                  )}
                </div>

                {/* 기술 스택 */}
                {job.skillList && job.skillList.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {job.skillList.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={skill.recruitSkillCode || index}
                          variant="outline"
                          className="text-xs bg-gray-50"
                        >
                          {skill.recruitSkillName}
                        </Badge>
                      ))}
                      {job.skillList.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{job.skillList.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* 통계 정보 */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>조회 {job.viewCnt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Card className="border-0 shadow-soft">
          <CardContent className="py-6">
            <div className="flex items-center justify-center gap-2">
              {/* 이전 페이지 버튼 */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* 첫 페이지 */}
              {generatePageNumbers()[0] > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(1)}
                    className="px-3"
                  >
                    1
                  </Button>
                  {generatePageNumbers()[0] > 2 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                </>
              )}

              {/* 페이지 번호들 */}
              {generatePageNumbers().map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="px-3"
                >
                  {pageNum}
                </Button>
              ))}

              {/* 마지막 페이지 */}
              {generatePageNumbers()[generatePageNumbers().length - 1] <
                totalPages && (
                <>
                  {generatePageNumbers()[generatePageNumbers().length - 1] <
                    totalPages - 1 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3"
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              {/* 다음 페이지 버튼 */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && jobs.length === 0 && (
        <Card className="border-0 shadow-soft">
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {searchTerm ? "검색 결과가 없습니다" : "공고가 없습니다"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "다른 검색어를 시도해보세요."
                : "현재 등록된 채용 공고가 없습니다."}
            </p>
            {searchTerm && (
              <Button variant="outline" onClick={clearSearch}>
                검색 초기화
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobListDetail;
