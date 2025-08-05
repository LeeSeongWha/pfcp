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
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Building2,
  CheckCircle,
  Edit,
  Trash2,
  GraduationCap,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Eye,
  Bookmark,
} from "lucide-react";
import { Input } from "../../components/ui/jobs/input";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../../components/ui/jobs/select";
import { useToast } from "../../components/ui/jobs/use-toast";
import { Separator } from "../../components/ui/jobs/separator";

const JobPostDetail = () => {
  const { jobId } = useParams(); // recruitmentNo가 전달됨
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 카테고리 색상 매핑
  const categoryColors = {
    IT: "bg-blue-500",
    영업: "bg-green-500",
    마케팅: "bg-purple-500",
    디자인: "bg-yellow-500",
    HR: "bg-red-500",
  };

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        // 모든 공고를 가져온 후 특정 공고를 찾기
        const response = await axios.get(
          `/ajax/recruit/search?page=1&pageSize=100&sort=RD`, // pageSize를 늘려서 더 많은 데이터 확보
          {
            withCredentials: true,
          }
        );

        console.log("가져온 데이터:", response.data);

        if (response.data && response.data.data) {
          const jobs = Array.isArray(response.data.data)
            ? response.data.data
            : [];

          // recruitmentNo가 일치하는 공고 찾기
          const targetJob = jobs.find((job) => job.recruitmentNo === jobId);

          if (targetJob) {
            setJobDetail(targetJob);
          } else {
            setJobDetail(null);
            setError("요청하신 공고를 찾을 수 없습니다.");
          }
        } else {
          setJobDetail(null);
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

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

  // 로딩 중이거나 에러 발생 시 렌더링
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">
          공고 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  if (error || !jobDetail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="border-0 shadow-medium max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">
              {error || "공고를 찾을 수 없습니다"}
            </h2>
            <p className="text-muted-foreground mb-4">
              요청하신 취업 공고가 존재하지 않거나 삭제되었을 수 있습니다.
            </p>
            <Link to="/jobs">
              <Button>공고 목록으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleToggleActive = () => {
    const newStatus = jobDetail.recruitFinishYn === "N" ? "Y" : "N";
    toast({
      title:
        newStatus === "N"
          ? "공고가 활성화되었습니다"
          : "공고가 비활성화되었습니다",
      description: `"${jobDetail.recruitmentTitle}" 공고 상태가 변경되었습니다.`,
    });
    setJobDetail((prev) => ({ ...prev, recruitFinishYn: newStatus }));
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b bg-white shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                {jobDetail.comLogo && (
                  <img
                    src={jobDetail.comLogo}
                    alt={jobDetail.comName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {jobDetail.recruitmentTitle}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {jobDetail.comName}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleToggleActive}
                className="rounded-md"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                {jobDetail.recruitFinishYn === "N" ? "비활성화" : "활성화"}
              </Button>
              <Button variant="outline" className="rounded-md">
                <Edit className="mr-2 h-4 w-4" />
                수정
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Info */}
            <Card className="border-0 shadow-medium rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {jobDetail.recruitmentTitle}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-lg">
                      <Building2 className="h-5 w-5" />
                      {jobDetail.comName}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 rounded-md"
                    >
                      {jobDetail.jobName}
                    </Badge>
                    <Badge
                      variant={
                        jobDetail.recruitFinishYn === "N"
                          ? "default"
                          : "outline"
                      }
                      className="rounded-md"
                    >
                      {jobDetail.recruitFinishYn === "N" ? "모집중" : "마감"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatLocation(
                        jobDetail.cityName,
                        jobDetail.districtName
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{jobDetail.yearCodeName || "경력무관"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {jobDetail.education?.recruitmentEducationCodeName ||
                        "학력무관"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-destructive" />
                    <span className="text-destructive font-medium">
                      마감: {formatDate(jobDetail.recruitmentFinishDate)}
                    </span>
                  </div>
                </div>

                {jobDetail.recruitmentSalary && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-600">
                      연봉{" "}
                      {parseInt(jobDetail.recruitmentSalary).toLocaleString()}
                      만원
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>조회수 {jobDetail.viewCnt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="h-4 w-4" />
                    <span>스크랩 {jobDetail.scrabCnt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-medium rounded-lg">
              <CardHeader>
                <CardTitle>채용 공고 내용</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {jobDetail.recContent ? (
                    <div
                      className="whitespace-pre-line text-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: jobDetail.recContent }}
                    />
                  ) : (
                    <p className="text-muted-foreground">
                      상세 내용이 없습니다.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            {jobDetail.skillList && jobDetail.skillList.length > 0 && (
              <Card className="border-0 shadow-medium rounded-lg">
                <CardHeader>
                  <CardTitle>요구 기술</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {jobDetail.skillList.map((skill, index) => (
                      <Badge
                        key={skill.recruitSkillCode || index}
                        variant="outline"
                        className="bg-gray-50"
                      >
                        {skill.recruitSkillName}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferential Treatment */}
            {jobDetail.preferential && (
              <Card className="border-0 shadow-medium rounded-lg">
                <CardHeader>
                  <CardTitle>우대사항</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">
                    {jobDetail.preferential}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card className="border-0 shadow-medium rounded-lg">
              <CardHeader>
                <CardTitle>회사 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {jobDetail.comLogo && (
                    <img
                      src={jobDetail.comLogo}
                      alt={jobDetail.comName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{jobDetail.comName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {jobDetail.jobName}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Meta */}
            <Card className="border-0 shadow-medium rounded-lg">
              <CardHeader>
                <CardTitle>공고 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">등록일</span>
                  <span>{formatDate(jobDetail.recruitmentStartDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">마감일</span>
                  <span>{formatDate(jobDetail.recruitmentFinishDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">공고 상태</span>
                  <Badge
                    variant={
                      jobDetail.recruitFinishYn === "N"
                        ? "default"
                        : "secondary"
                    }
                    className="rounded-md"
                  >
                    {jobDetail.recruitFinishYn === "N" ? "모집중" : "마감"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">공고번호</span>
                  <span className="font-mono text-xs">
                    {jobDetail.recruitmentNo}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                지원하기
              </Button>
              <Button variant="outline" className="w-full">
                <Bookmark className="mr-2 h-4 w-4" />
                스크랩
              </Button>
              <Link to="/jobs">
                <Button
                  variant="outline"
                  className="w-full bg-gray-50 hover:bg-gray-100"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  목록으로
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostDetail;
