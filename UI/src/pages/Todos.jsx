import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listTodos } from "../apis/todo/list";
import { deleteTodo } from "../apis/todo/delete"; // Import the delete API function
import { editTodo } from "../apis/todo/edit"; // Import the edit API function
import { setTodos } from "../redux/slice/todoSlice";

const TodosPage = () => {
  const token = useSelector((state) => state.user.token); // Get token from Redux
  const dispatch = useDispatch();
  const [todos, settodos] = useState([]); // Local state for todos
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [currentTodo, setCurrentTodo] = useState(null); // State for the todo being edited
  const [editText, setEditText] = useState(""); // State for the edit form text
  const [editCompleted, setEditCompleted] = useState(false); // State for the edit form completion status

  // Fetch todos from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await listTodos(token); // Call the API service
      if (data?.success) {
        dispatch(setTodos(data.todos)); // Update Redux store
        settodos(data.todos); // Set local state
      } else {
        throw new Error("Failed to load todos");
      }
    } catch (error) {
      setError("Failed to fetch todos");
      toast.error("Error fetching todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const data = await deleteTodo(id, token); // Call delete API
      if (data?.success) {
        settodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // Update local state
        toast.success("Todo deleted successfully!");
      } else {
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      toast.error("Error deleting todo. Please try again.");
    }
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setEditText(todo.text); // Set current todo's text to the edit form
    setEditCompleted(todo.completed); // Set current todo's completion status to the edit form
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleEditSubmit = async () => {
    try {
      const updatedTodo = { text: editText, completed: editCompleted };
      const data = await editTodo(currentTodo._id, updatedTodo, token); // Call edit API
      if (data?.success) {
        // Update local state and Redux store with updated todo
        settodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === currentTodo._id ? { ...todo, ...updatedTodo } : todo
          )
        );
        dispatch(setTodos(todos));
        setIsEditModalOpen(false); // Close the modal
        toast.success("Todo updated successfully!");
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      toast.error("Error updating todo. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Todos</h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <ul className="space-y-4">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo._id} className="p-4 border rounded-md shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{todo.text}</h3>
                    <p
                      className={`text-sm ${
                        todo.completed ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Not Completed"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(todo.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Todo</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editCompleted}
                  onChange={() => setEditCompleted(!editCompleted)}
                  className="h-4 w-4 text-blue-500"
                />
                <span className="text-sm">Mark as completed</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
