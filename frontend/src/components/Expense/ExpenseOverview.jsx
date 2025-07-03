import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../charts/CustomLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 gap-4 sm:gap-0">
        <div>
          <h5 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
            Expense Overview
          </h5>
          <p className="text-sm sm:text-base text-gray-400">
            Visualize your expenses and income trends with clarity.
          </p>
        </div>
        <button 
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:shadow-2xl active:scale-95 text-sm sm:text-base"
          onClick={onExpenseIncome}
        >
          <LuPlus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl overflow-x-auto">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
