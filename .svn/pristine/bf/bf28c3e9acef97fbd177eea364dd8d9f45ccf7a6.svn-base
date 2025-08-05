import { useLocation, useParams } from "react-router";

const useBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams();

  const pathnames = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = [];

  // 각 breadcrumb의 올바른 경로를 계산
  pathnames.forEach((segment, index) => {
    let name = "";

    switch (segment) {
      case "eclass":
        name = null;
        break;
      case "lecture":
        name = "강의 목록";
        break;
      case params.userNo:
        name = null;
        break;
      case params.lectureName:
        name = null;
        break;
      case "assignment":
        name = "과제 목록";
        break;
      case params.assignmentId:
        name = "과제 상세";
        break;
      case "assignmentList":
        name = "과제 목록";
        break;
      default:
        name = decodeURIComponent(segment);
    }

    if (name) {
      let path = undefined;

      // 마지막 항목이 아닌 경우에만 경로 생성
      if (index !== pathnames.length - 1) {
        if (segment === "lecture") {
          // "강의 목록"의 경우: userNo까지 포함된 경로
          const userNoIndex = pathnames.findIndex((p) => p === params.userNo);
          if (userNoIndex !== -1) {
            path = "/" + pathnames.slice(0, userNoIndex + 1).join("/");
          } else {
            path = "/" + pathnames.slice(0, index + 1).join("/");
          }
        } else if (segment === "assignment") {
          // "과제 목록"의 경우: lectureName까지 포함된 경로
          const lectureNameIndex = pathnames.findIndex(
            (p) => p === params.lectureName
          );
          if (lectureNameIndex !== -1) {
            path =
              "/" +
              pathnames.slice(0, lectureNameIndex + 1).join("/") +
              "/assignment";
          } else {
            path = "/" + pathnames.slice(0, index + 1).join("/");
          }
        } else {
          // 기본 경우: 현재 인덱스까지의 경로
          path = "/" + pathnames.slice(0, index + 1).join("/");
        }
      }

      breadcrumbs.push({
        name,
        path,
      });
    }
  });

  return breadcrumbs;
};

export default useBreadcrumbs;
