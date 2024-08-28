import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/auth/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }


  if (!user || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
