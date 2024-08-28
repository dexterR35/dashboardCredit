import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { signInWithEmail } from '../../firebase/auth/services/authService';
import { useAuth } from '../../firebase/auth/hooks/useAuth';

const LoginPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const authUser = await signInWithEmail(email, password); // authUser now contains the correct user object
      sessionStorage.removeItem("manualLogout"); // Clear the manualLogout flag
      navigate(authUser.role === 'admin' ? "/admin/home" : "/user/home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/home' : '/user/home'} replace />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-600 mb-8">Sign in to access your account</p>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Sign in
        </button>
        <p className='pt-4 text-gray-400 leading-4 text-[12px] lowercase'>@YourApp 2024</p>
      </div>
    </div>
  );
};

export default LoginPage;
