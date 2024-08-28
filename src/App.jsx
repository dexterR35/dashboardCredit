import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import UserCreationPage from './components/UserCrationForm'; // Import the User Creation Page
import { ToastContainer } from 'react-toastify';
import { useAuth } from './firebase/auth/hooks/useAuth';
import ProtectedRoute from './services/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user, loading } = useAuth();

  // Function to determine where to redirect based on the user role
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
            user 
              ? <Navigate to={getHomeRoute(user.role)} replace /> 
              : <Navigate to="/admin/login" replace />
          } 
        />
        <Route 
          path="/admin/login" 
          element={
            user 
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
              <UserCreationPage /> {/* Add the User Creation Page */}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="*" 
          element={
            <Navigate to={user ? getHomeRoute(user.role) : "/admin/login"} replace />
          } 
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
