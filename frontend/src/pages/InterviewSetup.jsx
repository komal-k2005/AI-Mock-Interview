import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';

const InterviewSetup = () => {
  const [formData, setFormData] = useState({
    targetRole: '',
    interviewType: 'Technical',
    difficulty: 'Medium',
    numberOfQuestions: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Creating interview with data:', formData);
      const response = await interviewAPI.create(formData);
      console.log('Interview created successfully:', response.data);
      navigate(`/interview/${response.data.id}`);
    } catch (error) {
      console.error('Error creating interview:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        setError('Cannot connect to server. Please make sure the backend is running.');
      } else {
        setError('Failed to create interview. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="flex items-center space-x-3 mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Interview Setup
          </h1>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
            <span>●</span>
            <span>AI Powered</span>
          </div>
        </div>
        
        {/* AI Features Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-6 max-w-2xl animate-slide-in">
          <div className="flex items-start space-x-3">
            <div className="text-2xl animate-bounce">🤖</div>
            <div>
              <h3 className="font-semibold text-indigo-800 mb-1">AI-Enhanced Interview Experience</h3>
              <p className="text-sm text-indigo-700">
                Generate relevant interview questions based on your target role, get intelligent feedback on your answers, 
                and receive AI-powered performance analysis to improve your interview skills.
              </p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 max-w-2xl animate-shimmer">
            {error}
          </div>
        )}
        
        <Card className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Target Role
              </label>
              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="e.g., Java Developer, Frontend Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg hover:border-indigo-400"
                required
              />
              <p className="text-xs text-gray-500 mt-1">AI will generate questions specific to this role</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Interview Type
              </label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg hover:border-indigo-400"
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg hover:border-indigo-400"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Number of Questions
              </label>
              <input
                type="number"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg hover:border-indigo-400"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Select between 1-50 questions (AI will generate questions)</p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating Interview...' : 'Start Interview'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default InterviewSetup;