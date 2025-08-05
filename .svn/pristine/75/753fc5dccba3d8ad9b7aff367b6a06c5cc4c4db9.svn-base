import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, GraduationCap, Lock, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignInForm() {
  const { login } = useAuth();
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const obj = {
      username: formData.username,
      password: formData.password,
    };

    try {
      await axios.post("http://localhost/common/auth", obj, {
        withCredentials: true, // 쿠키 설정 받기
      });

      navigation("/");
    } catch (err) {
      console.error("로그인 실패", err);
    }
  };
  return (
    <div className="min-h-screen from-cyan-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-lg max-w-sm overflow-hidden">
        {/* 헤더 - 파란색 배경 */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-8 text-center">
          <div className="inline-flex items-center justify-center w-full h-12 mb-3">
            <img src={"../../public/images/logo/부엉대로고.png"} width={200} />
          </div>
          <h1 className="text-white text-lg font-bold">로그인</h1>
        </div>

        {/* 로그인 폼 */}
        <div className="px-8 py-8 space-y-5">
          {/* 학번 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              학번
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                placeholder="학번을 입력하세요"
                required
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
          </div>

          {/* 자동 로그인 체크박스 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-cyan-400 border-gray-300 rounded focus:ring-cyan-400"
              />
              <span className="ml-2 text-sm text-gray-600">자동 저장</span>
            </label>
            <a
              href="#"
              className="text-sm text-cyan-500 hover:text-cyan-600 transition-colors"
            >
              비밀번호 찾기
            </a>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            onClick={submitHandler}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            로그인
          </button>

          {/* 뒤로가기 버튼 */}
          <a href="http://localhost/">
            <button
              type="button"
              className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200"
            >
              학사관리 메인 페이지
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
