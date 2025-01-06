import React, { useState } from "react";
import { addTodo } from "../apis/todo/add";
import { useSelector } from "react-redux";
import { toast } from "react-toastify"; // No need to import toastify globally if initialized in main.jsx

const AddTodo = () => {
  const token = useSelector((state) => state.user.token);
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompleted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      setError("Todo text is required");
      return;
    }

    setLoading(true);
    try {
      const body = { text, completed };
      const response = await addTodo(body, token);
      if (response) {
        // Reset form fields
        setText("");
        setCompleted(false);
        setError("");
        
        // Show success toast
        toast.success("Todo added successfully!");
      }
    } catch (error) {
      setError("Failed to add todo");

      // Show error toast
      toast.error("Failed to add todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add a New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700">
            Todo Text
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={handleTextChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter todo text"
          />
        </div>
        <div>
          <label htmlFor="completed" className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={handleCompletedChange}
              className="h-4 w-4 text-blue-500"
            />
            <span className="text-sm">Mark as completed</span>
          </label>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className={`w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
