import React from 'react';
import { Download as LuDownload, PiggyBank as LuPiggyBank, ArrowDownCircle as LuArrowDownCircle } from 'lucide-react';
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  const handleDelete = async (id) => {
    try {
      console.log('Deleting Expense with ID:', id);
      await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      onDelete(id);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-0">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700/50 w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
          <div>
            <h5 className="text-xl sm:text-2xl font-bold text-white mb-1">Expense Records</h5>
            <p className="text-sm sm:text-base text-gray-400">Track and manage your expenses efficiently</p>
          </div>

          <button 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:shadow-2xl active:scale-95 text-sm sm:text-base"
            onClick={onDownload}
          >
            <LuDownload className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download Report</span>
          </button>
        </div>

        {/* Grid of transactions */}
        {transactions?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {transactions.map((expense) => (
              <TransactionCard
                key={expense._id}
                title={expense.category}
                amount={expense.amount}
                date={moment(expense.date).format('DD MMM YYYY')}
                icon={expense.icon}
                onDelete={() => handleDelete(expense._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuPiggyBank className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg">No expense records found.</p>
            <p className="text-gray-500 mt-2">Start adding your expenses to view them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TransactionCard = ({ title, amount, date, onDelete }) => (
  <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full">
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-3">
        <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
          <LuArrowDownCircle className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
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
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <LuArrowDownCircle className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-lg sm:text-xl font-bold text-white">${amount.toLocaleString()}</span>
    </div>
  </div>
);

export default ExpenseList;
