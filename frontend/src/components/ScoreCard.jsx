import React, { useEffect, useState } from 'react';

const ScoreCard = ({ label, score, color = 'indigo' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const colors = {
    indigo: { bg: 'from-indigo-500 to-purple-500', text: 'text-indigo-600', bar: 'bg-indigo-500' },
    green: { bg: 'from-green-500 to-emerald-500', text: 'text-green-600', bar: 'bg-green-500' },
    blue: { bg: 'from-blue-500 to-cyan-500', text: 'text-blue-600', bar: 'bg-blue-500' },
    purple: { bg: 'from-purple-500 to-pink-500', text: 'text-purple-600', bar: 'bg-purple-500' },
  };

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-100">
      <h4 className="text-gray-600 text-sm font-medium mb-2">{label}</h4>
      <div className={`text-4xl font-bold ${colors[color].text} mb-2`}>
        {animatedScore}%
      </div>
      <div className="w-full bg-gray-200 h-3 rounded-full mt-4 overflow-hidden">
        <div
          className={`h-3 rounded-full bg-gradient-to-r ${colors[color].bg} transition-all duration-1000 ease-out`}
          style={{ width: `${animatedScore}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;