import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-sm">
        <p className="font-semibold text-black">{payload[0].name}</p>
        <p className="text-black">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const getResponsiveRadius = (width) => {
  if (width < 640) return { outer: 90, inner: 60 };
  if (width < 768) return { outer: 110, inner: 80 };
  return { outer: 130, inner: 95 };
};

const CustomPieChart = ({
  data = [],
  label = "Total",
  totalAmount = "$0",
  colors = ["#875CF5", "#FA2C37", "#FF6900"],
  showTextAnchor = true,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { outer, inner } = getResponsiveRadius(windowWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          {colors.map((color, index) => (
            <radialGradient
              key={`gradient-${index}`}
              id={`gradient-${index}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </radialGradient>
          ))}
        </defs>

        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={outer}
          innerRadius={inner}
          labelLine={false}
          isAnimationActive={true}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#gradient-${index % colors.length})`}
              stroke="#fff"
              strokeWidth={2}
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.filter =
                  "drop-shadow(0 6px 16px rgba(0, 0, 0, 0.3))";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.filter =
                  "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))";
                e.target.style.transform = "scale(1)";
              }}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#A020F0"
              fontSize="14px"
              fontWeight="500"
              letterSpacing="1px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy="20"
              textAnchor="middle"
              fontSize="24px"
              fontWeight="700"
              fill="#A020F0"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
