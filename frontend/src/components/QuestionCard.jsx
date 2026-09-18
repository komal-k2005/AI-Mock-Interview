import React from 'react';

const QuestionCard = ({ question, questionNumber, totalQuestions, aiEnabled }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-100 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          {aiEnabled && (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs px-2 py-1 rounded-full animate-pulse">
              <span className="text-xs">✨</span>
              <span>AI Generated</span>
            </div>
          )}
        </div>
        <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
          {question.difficulty}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-relaxed">
        {question.questionText}
      </h3>
      {question.category && (
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600 font-medium">Category:</span>
          <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full font-medium">
            {question.category}
          </span>
        </div>
      )}
      {aiEnabled && (
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">🤖</span>
          <span className="text-xs text-gray-600">
            This question was AI-generated based on your interview parameters
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;