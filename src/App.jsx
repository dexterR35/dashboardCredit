import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage'; // Ensure default import for LoginPage
// import MainLayout from './components/MainLayout'; // Assuming you have a MainLayout component
import { ToastContainer } from 'react-toastify';
import { checkAuthStatus } from './firebase/auth/services/authService'; 
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // const { user, loading } = checkAuthStatus(); // Use the hook to get user and loading state
  const [user, setUser] = useState(null); // Manage user state here
  const { loading } = checkAuthStatus();
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading state while user is being checked
    }
    return user ? children : <Navigate to="/admin/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/admin/home" replace /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            {/* <MainLayout /> Assuming MainLayout is used for protected routes */}
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer /> {/* Enable toast notifications */}
    </Router>
  );
};

export default App;
