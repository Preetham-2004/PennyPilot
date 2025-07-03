import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 md:p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 w-full md:w-auto">
      <div
        className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-xl md:text-2xl text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs md:text-sm text-gray-500 mb-1">{label}</h6>
        <span className="text-lg md:text-[22px] font-semibold">{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
