import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../firebase/auth/hooks/useAuth';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const { user, loading, signInWithEmailPassword } = useAuth(); // Check if this function is correctly imported
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const authUser = await signInWithEmailPassword(email, password);
      setUser(authUser); // Set user state in App.jsx
      navigate("/admin/home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
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
