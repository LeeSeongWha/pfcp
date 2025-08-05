// components/common/Toast.js
import React from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const getToastConfig = (type) => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-400",
          textColor: "text-green-800",
          icon: <CheckCircle className="w-5 h-5" />,
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-400",
          textColor: "text-red-800",
          icon: <XCircle className="w-5 h-5" />,
        };
      case "warning":
        return {
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-400",
          textColor: "text-yellow-800",
          icon: <AlertCircle className="w-5 h-5" />,
        };
      case "info":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-400",
          textColor: "text-blue-800",
          icon: <Info className="w-5 h-5" />,
        };
      default:
        return {
          bgColor: "bg-gray-50",
          borderColor: "border-gray-400",
          textColor: "text-gray-800",
          icon: <Info className="w-5 h-5" />,
        };
    }
  };

  const config = getToastConfig(toast.type);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 animate-slide-in-left">
        <div
          className={`flex items-center px-4 py-3 rounded-lg shadow-lg border-l-4 min-w-80 max-w-96 ${config.bgColor} ${config.borderColor} ${config.textColor}`}
        >
          <div className="mr-3">{config.icon}</div>
          <div className="flex-1">
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`ml-2 p-1 rounded hover:bg-opacity-20 hover:bg-gray-500 transition-colors ${config.textColor}`}
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Toast;
