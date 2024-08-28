import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../firebase/auth/services/authService'; // Adjust the import path as necessary
import { useAuth } from '../firebase/auth/hooks/useAuth'; // Assuming you have a useAuth hook

const UserHome = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to login if user is not authenticated
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    if (isNavigating) return;
    setIsNavigating(true);

    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error.message);
    } finally {
      setIsNavigating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">User Dashboard</h1>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200 ${
          isNavigating ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isNavigating}
      >
        {isNavigating ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default UserHome;
