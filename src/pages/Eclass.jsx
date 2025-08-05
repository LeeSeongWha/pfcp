import { useEffect, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import LectureList from "./LectureList";

export default function Eclass() {
  return (
    <div>
      <PageMeta
        title="부엉대 | 사이버 강의실"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="사이버 강의실" />
      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1600px] text-center">
          <LectureList />
        </div>
      </div>
    </div>
  );
}
