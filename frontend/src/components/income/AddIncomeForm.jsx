import React, { useState } from 'react';
import { X, Image, Wallet, Briefcase, Gift, DollarSign, Building2, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AddIncomeForm({ onAddIncome }) {
  const navigate = useNavigate();
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const [showIconPicker, setShowIconPicker] = useState(false);

  const icons = [
    { icon: Wallet, name: 'Wallet' },
    { icon: Briefcase, name: 'Work' },
    { icon: Gift, name: 'Gift' },
    { icon: DollarSign, name: 'Money' },
    { icon: Building2, name: 'Business' },
    { icon: Monitor, name: 'Freelance' },
  ];

  const handleChange = (key, value) => setIncome({ ...income, [key]: value });

  const handleIconSelect = (iconName) => {
    handleChange('icon', iconName);
    setShowIconPicker(false);
  };

  const SelectedIcon = icons.find(i => i.name === income.icon)?.icon || Image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={() => navigate(-1)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Add New Income</h2>

        {/* Icon Picker */}
        <div className="mb-8 relative">
          <button
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-xl transition-colors w-full"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm">
              <SelectedIcon className="w-7 h-7 text-gray-700" />
            </div>
            <span className="text-gray-700 font-medium">Pick Icon</span>
          </button>

          {showIconPicker && (
            <div className="absolute top-full left-0 mt-3 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-10">
              <div className="grid grid-cols-3 gap-3">
                {icons.map((IconItem) => (
                  <button
                    key={IconItem.name}
                    onClick={() => handleIconSelect(IconItem.name)}
                    className="p-4 hover:bg-gray-50 rounded-xl transition-colors flex flex-col items-center gap-2 group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <IconItem.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{IconItem.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Income Source</label>
            <input
              value={income.source}
              onChange={({ target }) => handleChange("source", target.value)}
              placeholder="Freelancing, Salary, etc."
              type="text"
              className="w-full px-4 py-3.5 bg-gray-100 rounded-xl border-2 border-transparent placeholder-gray-400 text-gray-900 focus:border-green-500 focus:ring-0 transition-colors font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                placeholder="0.00"
                type="number"
                className="w-full pl-8 pr-4 py-3.5 bg-gray-100 rounded-xl border-2 border-transparent placeholder-gray-400 text-gray-900 focus:border-green-500 focus:ring-0 transition-colors font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              value={income.date}
              onChange={({ target }) => handleChange("date", target.value)}
              type="date"
              className="w-full px-4 py-3.5 bg-gray-100 rounded-xl border-2 border-transparent placeholder-gray-400 text-gray-900 focus:border-green-500 focus:ring-0 transition-colors font-medium"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="button"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onAddIncome(income)}
            disabled={!income.source || !income.amount || !income.date}
          >
            Add Income
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddIncomeForm;
