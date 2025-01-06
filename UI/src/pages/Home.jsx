import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleAddTodoClick = () => {
    navigate("/add-todo");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-6 px-4">
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-lg mb-6">Explore, add, and manage your todos easily.</p>
        <button
          onClick={handleAddTodoClick}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default Home;
