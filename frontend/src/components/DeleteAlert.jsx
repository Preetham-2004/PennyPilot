import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    console.log('Cancel clicked');
    if (onCancel) {
      onCancel();
    } else {
      navigate(location.state?.from || '/', { replace: true });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 sm:px-0 z-50">
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Confirm Deletion</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">{content}</p>
        <div className="flex justify-end gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
