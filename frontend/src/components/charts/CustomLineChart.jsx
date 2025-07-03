import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200 text-xs sm:text-sm">
          <p className="font-semibold text-blue-600 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-gray-600">
            Amount:{" "}
            <span className="font-medium text-gray-900">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-700 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#70a1ff" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#70a1ff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#475569" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#e0e7ff" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 10, fill: "#e0e7ff" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#70a1ff"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: "#ffffff", stroke: "#70a1ff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
