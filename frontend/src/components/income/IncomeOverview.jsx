import React, { useEffect, useState } from 'react';
import { LuPlus, LuTrendingUp } from 'react-icons/lu';
import { FaChartPie } from 'react-icons/fa';
import CustomBarChart from '../charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [averageIncome, setAverageIncome] = useState(0);
  const [sourceCount, setSourceCount] = useState(0);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    if (Array.isArray(result)) {
      setChartData(result);

      const total = transactions.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
      setTotalIncome(total);
      setAverageIncome(transactions.length ? (total / transactions.length).toFixed(2) : 0);
      setSourceCount(new Set(transactions.map((t) => t.source)).size);
    } else {
      console.error('Invalid chart data:', result);
    }
  }, [transactions]);

  const renderStatCard = (label, value, unit = '', isPositive = true) => (
    <div className="bg-white/5 rounded-2xl p-3 sm:p-4 backdrop-blur-sm w-full">
      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
        <FaChartPie className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
      <span className={`text-xs sm:text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{unit}</span>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-700/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <LuTrendingUp className="text-blue-500 w-5 h-5" />
            </div>
            <h5 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Income Overview
            </h5>
          </div>
          <p className="text-gray-400 text-sm">Track your earning patterns and financial growth</p>
        </div>
        <button 
          onClick={onAddIncome}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium rounded-2xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105"
        >
          <LuPlus className="text-lg" /> 
          <span>Record Income</span>
        </button>
      </div>

      <div className="mt-6 sm:mt-8">
        {chartData.length > 0 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {renderStatCard('Total Income', `$${totalIncome}`, `↑ ${(totalIncome / (averageIncome * transactions.length) * 100).toFixed(1)}%`)}
              {renderStatCard('Average', `$${averageIncome}`, 'Monthly')}
              {renderStatCard('Sources', `${sourceCount}`, 'Active')}
            </div>
            <div className="bg-white/5 rounded-2xl p-4 sm:p-6 h-[300px] backdrop-blur-sm">
              <CustomBarChart data={chartData} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 rounded-2xl border border-gray-700 bg-white/5 backdrop-blur-sm text-center px-4">
            <div className="bg-blue-500/10 p-4 rounded-full mb-4">
              <LuTrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Income Data Yet</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Start tracking your income to get insights into your financial patterns and growth over time.
            </p>
            <button 
              onClick={onAddIncome}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105"
            >
              <LuPlus className="text-lg" /> 
              <span>Add Your First Income</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
