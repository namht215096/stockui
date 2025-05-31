
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { label: "Cân đối kế toán", path: "/candoikt" },
  { label: "Kêt quả kinh doanh",path: "/kqkd" },
  { label: "Luân chuyển tiền tệ ",path:"/luanchuyentien" },
  // { label: "Tài chính" },
  // { label: "Hồ sơ doanh nghiệp" },
  // { label: "Tin tức & Sự kiện"},
  // { label: "DN cùng ngành"},
  // { label: "Tài liệu" },
  // { label: "Giao dịch nội bộ" },
  // { label: "Trái phiếu"},
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full px-4 py-6 bg-white">
      {/* Logo */}
      <div className="flex flex-col items-start md:flex-row md:items-center gap-4 mb-6">
        <img src="/logo.png" alt="Logo" className="w-28 h-auto" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b-4 border-blue-900">
        {tabs.map(({ label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`relative px-4 py-2 text-sm font-medium border-r border-gray-200
              ${location.pathname === path ? "bg-blue-900 text-white" : "bg-white text-blue-900"}
              hover:bg-blue-900 hover:text-white transition-colors duration-150`}
          >
            {label}
            {label === "Tài chính" && (
              <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-1 text-yellow-500 text-xs font-bold animate-pulse">
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
