import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../apis/auth/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setName, setToken, setEmail } from "../redux/slice/userSlice"
import { toast } from "react-toastify"; // Import toast from react-toastify
import { listTodos } from "../apis/todo/list"
import { setTodos } from "../redux/slice/todoSlice";


const Login = () => {
  let initial = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initial);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Basic validation
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const response = await login(email, password);
      if (response?.success) {
        const token = response.token
        dispatch(setToken(response.token));
        dispatch(setName(response.user.name));
        dispatch(setEmail(response.user.email));

        toast.success("Login successful! Redirecting to home page.");
       
      } else {
        toast.error("Login failed. Please try again.");
      }
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setFormData(initial);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-300 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
