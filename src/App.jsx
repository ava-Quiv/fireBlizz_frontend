import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

const App = () => {
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const handleNavigate = () => {
    navigate('/Login'); // Navigates to /admindash route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome to Fireblizz Company Limited
        </h1>
      </div>

      <button
        onClick={handleNavigate}
        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Get Started
      </button>
    </div>
  );
};

export default App;
