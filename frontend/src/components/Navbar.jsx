import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = async () => {
    // Try Firebase logout first
    await logout();
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    navigate('/login');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Mock Interview</span>
            </Link>
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              <span className="animate-pulse">●</span>
              <span>AI Powered</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-200 transition flex items-center space-x-1">
                  <span>📊</span>
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="hover:text-indigo-200 transition flex items-center space-x-1">
                  <span>👤</span>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="hover:text-indigo-200 transition flex items-center space-x-1 bg-white bg-opacity-10 hover:bg-opacity-20 px-4 py-2 rounded-lg transform hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto z-50"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span>🔐</span>
                  <span>Login</span>
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition transform hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto z-50"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className="flex items-center space-x-1">
                    <span>📝</span>
                    <span>Register</span>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;