import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      {icon && <div className="text-3xl text-gray-400">{icon}</div>}
    </div>
  );
};

export default StatCard;
