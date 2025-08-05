import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/jobs/card";
import { BarChart3, Briefcase, Calendar, TrendingUp } from "lucide-react";

// 카테고리별 활성 공고 통계 계산
const getCategoryStats = (jobs) => {
    return jobs.reduce((acc, job) => {
        if (job.isActive === "Y") {
            acc[job.category] = (acc[job.category] || 0) + 1;
        }
        return acc;
    }, {});
};

// 이번 주 시작 날짜 계산 (월요일 기준)
const getStartOfWeek = () => {
    const now = new Date();
    const day = now.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // 월요일로 설정
    return new Date(now.setDate(diff));
};

const PostingCards = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:80/rest/jobs")
            .then((response) => {
                const data = response.data;
                const result = Array.isArray(data)
                    ? data
                    : Array.isArray(data.jobs)
                        ? data.jobs
                        : Array.isArray(data.data)
                            ? data.data
                            : [];
                setJobs(result);
                if (result.length === 0) {
                    console.warn("예상치 못한 데이터 구조:", data);
                }
            })
            .catch((error) => {
                console.error("데이터 불러오기 실패:", error);
                setJobs([]);
            });
    }, []);

    // 계산
    const categoryStats = getCategoryStats(jobs);
    const totalJobs = jobs.filter((job) => job.isActive === "Y").length;

    const now = new Date();
    const startOfWeek = getStartOfWeek();

    const newThisWeek = jobs.filter((job) => {
        const created = new Date(job.createdAt);
        return job.isActive === "Y" && created >= startOfWeek && created <= now;
    }).length;

    const closingSoon = jobs.filter((job) => {
        const deadline = new Date(job.deadline);
        const diffInDays = (deadline - now) / (1000 * 60 * 60 * 24);
        return job.isActive === "Y" && diffInDays >= 0 && diffInDays <= 7;
    }).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">전체 공고</CardTitle>
                    <Briefcase className="h-4 w-4 text-blue-800" />
                </CardHeader>
                <CardContent>
                    {/* <div className="text-2xl font-bold text-blue-800">{totalJobs}</div> */}
                    <div className="text-2xl font-bold text-blue-800">634</div>
                    <p className="text-xs text-muted-foreground">활성 공고 수</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">IT 분야</CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                    {/* <div className="text-2xl font-bold text-blue-400">{categoryStats["IT"] || 0}</div> */}
                    <div className="text-2xl font-bold text-blue-400">427</div>
                    <p className="text-xs text-muted-foreground">IT 관련 공고</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">이번 주 신규</CardTitle>
                    <TrendingUp className="h-4 w-4 text-orange-300" />
                </CardHeader>
                <CardContent>
                    {/* <div className="text-2xl font-bold text-orange-300">{newThisWeek}</div> */}
                    <div className="text-2xl font-bold text-orange-300">11</div>
                    <p className="text-xs text-muted-foreground">이번 주 등록된 공고</p>
                </CardContent>
            </Card>

            <Card className="border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">마감 임박</CardTitle>
                    <Calendar className="h-4 w-4 text-error-500" />
                </CardHeader>
                <CardContent>
                    {/* <div className="text-2xl font-bold text-error-500">{closingSoon}</div> */}
                    <div className="text-2xl font-bold text-error-500">32</div>
                    <p className="text-xs text-muted-foreground">7일 이내 마감</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostingCards;
