import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/jobs/card";
import { Badge } from "../../components/ui/jobs/badge";
import { Button } from "../../components/ui/jobs/button";
import { BarChart3, Briefcase, Calendar, TrendingUp } from "lucide-react";
import RegisterButton from "./RegisterButton";

// 카테고리별 활성 공고 통계 계산 함수
const getCategoryStats = (jobs) => {
  return jobs.reduce((acc, job) => {
    if (job.isActive) {
      acc[job.category] = (acc[job.category] || 0) + 1;
    }
    return acc;
  }, {});
};

const RecentPosts = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:80/rest/jobs")
      .then((response) => {
        const data = response.data;

        // 여러 구조 중 배열 찾아내기
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

  const categoryStats = getCategoryStats(jobs);
  const totalJobs = jobs.filter((job) => job.isActive).length;

  return (
    <>
      {/* Category Distribution */}
      <div>
        <Card className="border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              분야별 공고 현황
            </CardTitle>
            <CardDescription>
              분야별 공고 분포를 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-category-디자인" />
                <span className="text-sm font-medium">디자인</span>
              </div>
              <Badge variant="secondary">58</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-category-IT" />
                <span className="text-sm font-medium">IT</span>
              </div>
              <Badge variant="secondary">427</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-category-금융" />
                <span className="text-sm font-medium">금융</span>
              </div>
              <Badge variant="secondary">49</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-category-경영" />
                <span className="text-sm font-medium">경영</span>
              </div>
              <Badge variant="secondary">42</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-category-마케팅" />
                <span className="text-sm font-medium">마케팅</span>
              </div>
              <Badge variant="secondary">58</Badge>
            </div>


            {/* {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-category-${category.toLowerCase()}`}
                  />
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))} */}

            <div className="pt-4 border-t">
              <Link to="/jobs/jobsListDetail">
                <Button
                  variant="outline"
                  className="w-full hover:bg-orange-300"
                >
                  분야별 조회
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RecentPosts;
