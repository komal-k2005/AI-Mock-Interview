import React from 'react';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100 ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold mb-4 text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;