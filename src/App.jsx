import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './firebase/auth/hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, loading } = useAuth(); // Use the hook to get user and loading state
  const [currentUser, setCurrentUser] = useState(null); // Manage user state here

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]); // Update currentUser whenever user changes

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading state while user is being checked
    }
    return currentUser ? children : <Navigate to="/admin/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/admin/home" replace /> : <Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<LoginPage setUser={setCurrentUser} />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
      <ToastContainer /> {/* Enable toast notifications */}
    </Router>
  );
};

export default App;
