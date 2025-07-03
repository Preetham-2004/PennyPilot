import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, 
}) => {
    const getAmountStyle = ()=>
        type==="income" ? "bg-green-50 text-green-500" :"bg-red-50 bg-red-500";
    
  return (
    <div className="group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? <img src={icon} alt={title} className="w-6 h-6" /> : <LuUtensils />}
      </div>

      <div className="flex-1">
        <p className="text-gray-800 font-medium">{title}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <div className="flex items-center gap-2">
        <h6 className={`text-sm font-semibold ${type === "income" ? "text-green-500" : "text-red-500"}`}>
          {type === "income" ? "+" : "-"} ${amount}
        </h6>
        {type === "income" ? <LuTrendingUp className="text-green-500" /> : <LuTrendingDown className="text-red-500" />}
      </div>

      {!hideDeleteBtn && (
        <button className="text-red-500 hover:text-red-700" onClick={onDelete}>
          <LuTrash2 size={18} />
        </button>
      )}
    </div>
  );
};

export default TransactionInfoCard;
