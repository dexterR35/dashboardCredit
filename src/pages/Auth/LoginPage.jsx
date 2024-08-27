import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Login } from '../../firebase/auth/services/authService';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const authUser = await Login();
      sessionStorage.setItem("authUser", JSON.stringify(authUser));
      setUser(authUser);
      navigate("/admin/home");
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle errors if necessary
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Welcome</h1>
        <p className="text-gray-600 mb-8">Sign in to access your account</p>
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
        >
          Sign in with Google
        </button>
        <p className='pt-4 text-gray-400 leading-4 text-[12px] lowercase'>@ObtineCredit 2024</p>
      </div>
    </div>
  );
};

export default LoginPage;
