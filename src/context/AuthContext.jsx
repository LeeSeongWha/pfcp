// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { utils } from "../utils/utils";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost/common/auth/revoke",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
    setUser(null);
    window.location.href = "http://localhost/login";
  };

  const login = async () => {
    setUser(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await axios.get("http://localhost/rest/auth", {
          withCredentials: true,
        });

        if (resp.data.authenticated) {
          setUser({
            username: resp.data.username,
            roles: resp.data.authorities,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("인증 확인 오류:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
