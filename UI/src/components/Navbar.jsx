import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../redux/slice/userSlice";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  const token = useSelector((state) => state.user.token);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="h-screen w-screen">
      <nav className="fixed w-full bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-cyan-400">To</span>
              <span className="text-white">Doo</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/todos" className="text-white px-4 py-2 rounded font-medium hover:bg-gray-700">
              Todos
            </Link>
            <Link to="/add-todo" className="text-white px-4 py-2 rounded font-medium hover:bg-gray-700">
              Add Todo
            </Link>
          </div>

          {/* Right Section: Profile or Auth Links */}
          <div className="flex items-center gap-4">
            {token ? (
              <div className="relative">
                {/* Profile Icon with Dropdown */}
                <button
                  onClick={handleDropdownToggle}
                  className="text-cyan-400 text-3xl hover:text-cyan-300"
                >
                  <FaUserCircle />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 shadow-md rounded-md">
                    <ul className="flex flex-col">
                      <li>
                        <div className="block px-4 py-2 hover:bg-gray-200">
                          {name}
                        </div>
                      </li>
                      <li>
                        <div className="block px-4 py-2 hover:bg-gray-200">
                          {email}
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-600 text-white px-4 py-2 rounded font-medium hover:bg-gray-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <div className="h-full w-full pt-16 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
