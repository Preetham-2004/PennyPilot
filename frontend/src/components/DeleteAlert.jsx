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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">{content}</p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
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
