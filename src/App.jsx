import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import UserCreationPage from './components/UserCrationForm'; 
import { ToastContainer } from 'react-toastify';
import { useAuth } from './firebase/auth/hooks/useAuth';
import ProtectedRoute from './services/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, loading } = useAuth();

  const getHomeRoute = (role) => {
    return role === 'admin' ? '/admin/home' : '/user/home';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            user && user.token 
              ? <Navigate to={getHomeRoute(user.role)} replace /> 
              : <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/login" 
          element={
            user && user.token 
              ? <Navigate to={getHomeRoute(user.role)} replace />
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
          path="/admin/create-user" 
          element={
            <ProtectedRoute requiredRole="admin">
              <UserCreationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <Navigate to={user && user.token ? getHomeRoute(user.role) : "/admin/login"} replace />
          } 
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
