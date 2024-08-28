import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './firebase/auth/hooks/useAuth';
import ProtectedRoute from './services/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user 
              ? <Navigate to={user.role === 'admin' ? '/admin/home' : '/user/home'} replace /> 
              : <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/login" 
          element={
            user 
              ? <Navigate to={user.role === 'admin' ? '/admin/home' : '/user/home'} replace />
              : <LoginPage />
          } 
        />
        <Route 
          path="/admin/home" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminHome />
            </ProtectedRoute>
          } 
        />
    
        <Route 
          path="/user/home" 
          element={
            <ProtectedRoute requiredRole="user">
              <UserHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <Navigate to={user ? (user.role === 'admin' ? "/admin/home" : "/user/home") : "/admin/login"} replace />
          } 
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
