import React, { useState, useEffect } from 'react';
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
import CustomTooltip from './CustomTooltip';

const CustomBarChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [chartSize, setChartSize] = useState({
    height: 300,
    barSize: 95,
  });

  const barColors = [
    { base: '#A78BFA', hover: '#C4B5FD' },
    { base: '#F87171', hover: '#FEB2B2' },
    { base: '#F59E0B', hover: '#FBBF24' },
    { base: '#60A5FA', hover: '#93C5FD' },
  ];

  useEffect(() => {
    const updateChartSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setChartSize({ height: 220, barSize: 40 });
      } else if (width < 768) {
        setChartSize({ height: 260, barSize: 60 });
      } else {
        setChartSize({ height: 300, barSize: 95 });
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);

    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <ResponsiveContainer width="100%" height={chartSize.height}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

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

        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(135, 92, 245, 0.05)' }} />

        <Bar
          dataKey="amount"
          radius={[10, 10, 0, 0]}
          barSize={chartSize.barSize}
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
