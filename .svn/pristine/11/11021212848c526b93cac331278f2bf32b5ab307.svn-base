// pages/Dashboard/Home.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth(); // user.role 이 있다고 가정

  useEffect(() => {
    if (!user) return;

    switch (user.roles[0].authority) {
      case "ROLE_STD":
        navigate("/eclass/statistics");
        break;
      case "ROLE_PROF":
        navigate("/professorData");
        break;
      case "ROLE_STAFF":
        navigate("/staff/dashboard");
        break;
      default:
        navigate("http://localhost/"); // 기본 페이지
    }
  }, [user, navigate]);

  return null; // 혹은 로딩 중 표시 등
}
