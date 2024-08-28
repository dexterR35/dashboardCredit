import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/auth/hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth status
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <div>Access Denied</div>; // Show "Access Denied" message if the role does not match
  }

  return children;
};

export default ProtectedRoute;
