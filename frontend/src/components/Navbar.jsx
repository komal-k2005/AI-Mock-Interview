import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = async () => {
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
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="text-2xl font-bold flex items-center space-x-2 text-slate-800 hover:text-blue-600 transition-colors">
              <span>🤖</span>
              <span>AI Mock Interview</span>
            </Link>
            <div className="flex items-center space-x-2 bg-blue-50 px-2 py-1 rounded-full text-xs text-blue-600 font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>AI Powered</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-1 font-medium">
                  <span>📊</span>
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-1 font-medium">
                  <span>👤</span>
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-slate-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg transition-colors font-semibold shadow-sm hover:shadow"
                >
                  Register
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
