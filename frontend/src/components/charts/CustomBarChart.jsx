import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import CustomTooltip from './CustomTooltip'; // Your existing custom tooltip

const CustomBarChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Base and hover colors
  const barColors = [
    { base: '#A78BFA', hover: '#C4B5FD' },  // Purple
    { base: '#F87171', hover: '#FEB2B2' },  // Pink
    { base: '#F59E0B', hover: '#FBBF24' },  // Orange
    { base: '#60A5FA', hover: '#93C5FD' },  // Blue
  ];

  // Handle hover logic
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

        {/* X and Y Axis */}
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "#999" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#999" }}
          axisLine={false}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(135, 92, 245, 0.05)' }} />

        <Bar
          dataKey="amount"
          radius={[10, 10, 0, 0]}
          barSize={95}
          isAnimationActive={true}
        >
          {data.map((entry, index) => {
            const colorObj = barColors[index % barColors.length];
            const fillColor = hoveredIndex === index ? colorObj.hover : colorObj.base;

            return (
              <Cell
                key={`cell-${index}`}
                fill={fillColor}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                cursor="pointer"
              />
            );
          })}

          {/* Display values above bars */}
          <LabelList
            dataKey="amount"
            position="top"
            style={{
              fill: '#333',
              fontSize: 12,
              fontWeight: '600'
            }}
            formatter={(value) => `$${value}`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
