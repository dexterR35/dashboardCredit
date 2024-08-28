import React from 'react';
import { useAuth } from '../firebase/auth/hooks/useAuth'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      navigate('/login'); // Redirect to login page after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
      // Optionally, you might want to show an error message here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Home Page</h1>
      <p className="text-gray-600 mb-8">Welcome to your home page!</p>
      <button
        onClick={handleSignOut}
        className={`w-full ${loading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white font-semibold py-2 rounded transition duration-200`}
        disabled={loading}
      >
        {loading ? 'Signing Out...' : 'Sign Out'}
      </button>
    </div>
  );
};

export default Home;
