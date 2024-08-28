import React from 'react';
import UserCreationForm from './UserForm';

const UserCreationPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Create New User</h1>
      <div className="bg-white p-6 rounded shadow-md w-96">
        <UserCreationForm />
      </div>
    </div>
  );
};

export default UserCreationPage;
