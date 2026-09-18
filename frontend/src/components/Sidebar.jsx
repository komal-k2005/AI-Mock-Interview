import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', gradient: 'from-blue-500 to-cyan-500' },
    { path: '/interview-setup', label: 'New Interview', icon: '🎯', gradient: 'from-purple-500 to-pink-500' },
    { path: '/profile', label: 'Profile', icon: '👤', gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen fixed left-0 top-16 shadow-2xl border-r border-gray-700">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Interview
          </h2>
          <p className="text-xs text-gray-400 mt-1">Practice with AI</p>
        </div>
        
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  location.pathname === item.path
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                    : 'hover:bg-gray-700 hover:shadow-md'
                }`}
              >
                <span className="text-xl transform transition-transform duration-300 hover:rotate-12">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {location.pathname === item.path && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold">Pro Features</p>
          <p className="text-xs text-indigo-200 mt-1">AI-powered analysis</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;