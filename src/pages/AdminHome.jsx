// src/pages/AdminHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase/auth/services/authService'; // Adjust the import path as necessary

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHome;
