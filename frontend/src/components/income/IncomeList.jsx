import React from 'react';
import { Download as LuDownload, PiggyBank as LuPiggyBank, ArrowUpCircle as LuArrowUpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TransactionCard = ({ title, amount, date, onDelete }) => (
  <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
          <LuPiggyBank className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm">{date}</p>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-500 hover:text-red-400 transition-colors duration-200"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    <div className="mt-3 sm:mt-4 flex items-center gap-2">
      <LuArrowUpCircle className="text-green-400 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-lg sm:text-xl font-bold text-white">${amount.toLocaleString()}</span>
    </div>
  </div>
);

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-xl p-4 sm:p-8 rounded-3xl shadow-2xl border border-gray-700/50 w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h5 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Income Sources</h5>
            <p className="text-gray-400 text-sm sm:text-base">Track and manage your income streams</p>
          </div>

          <button 
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:shadow-2xl active:scale-95 text-sm sm:text-base"
            onClick={onDownload}
          >
            <LuDownload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download</span>
          </button>
        </div>

        {transactions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {transactions.map((income) => (
              <TransactionCard
                key={income._id}
                title={income.source}
                amount={income.amount}
                date={new Date(income.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
                onDelete={() => onDelete(income._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-800/50 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuPiggyBank className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-base sm:text-lg">No income records found.</p>
            <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Start adding your income to view them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
