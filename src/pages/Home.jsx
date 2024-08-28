// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../firebase/auth/services/authService';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        await Logout();
        navigate('/admin/login');
      } catch (error) {
        console.error("Logout error:", error.message);
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Home Page</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
