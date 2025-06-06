import React from 'react';
import { Download as LuDownload, PiggyBank as LuPiggyBank, ArrowUpCircle as LuArrowUpCircle } from 'lucide-react';

function App() {
  const handleDelete = (id) => console.log('Delete:', id);
  const handleDownload = () => console.log('Downloading...');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <IncomeList 
        transactions={mockTransactions} 
        onDelete={handleDelete}
        onDownload={handleDownload}
      />
    </div>
  );
}

const TransactionCard = ({ title, amount, date, onDelete }) => (
  <div className="bg-gray-800 rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl w-full">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <LuPiggyBank className="text-blue-400 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{date}</p>
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
      <LuArrowUpCircle className="text-green-400 w-5 h-5" />
      <span className="text-xl font-bold text-white">${amount.toLocaleString()}</span>
    </div>
  </div>
);

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="w-full mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-700/50 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h5 className="text-2xl font-bold text-white mb-2">Income Sources</h5>
            <p className="text-gray-400">Track and manage your income streams</p>
          </div>

          <button 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25 hover:shadow-2xl active:scale-95"
            onClick={onDownload}
          >
            <LuDownload className="w-5 h-5" />
            <span>Download Report</span>
          </button>
        </div>

        {transactions?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuPiggyBank className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-lg">No income records found.</p>
            <p className="text-gray-500 mt-2">Start adding your income to view them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;