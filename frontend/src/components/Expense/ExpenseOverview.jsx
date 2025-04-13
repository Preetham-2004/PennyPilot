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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-3xl font-bold text-white mb-2">Expense Overview</h5>
          <p className="text-gray-400">Visualize your expenses and income trends with clarity.</p>
        </div>
        <button 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:shadow-2xl active:scale-95"
          onClick={onExpenseIncome}
        >
          <LuPlus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="p-6 bg-gray-800 rounded-2xl shadow-xl">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;