import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated && !redirected) {
      setRedirected(true); // 무한 반복 방지
      const currentUrl = window.location.href;
      const loginUrl = `http://localhost/login?from=react&redirect_url=${encodeURIComponent(
        currentUrl
      )}`;
      window.location.replace(loginUrl);
    }
  }, [loading, isAuthenticated, redirected]);

  if (loading || (!isAuthenticated && !redirected)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>인증 확인 중...</div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
