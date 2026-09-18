import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getData();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="flex items-center space-x-3 mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
            <span>●</span>
            <span>AI Enabled</span>
          </div>
        </div>
        
        {/* AI Features Banner */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-4 mb-8 animate-slide-in">
          <div className="flex items-start space-x-3">
            <div className="text-2xl animate-bounce">🤖</div>
            <div>
              <h3 className="font-semibold text-indigo-800 mb-1">AI-Powered Learning Platform</h3>
              <p className="text-sm text-indigo-700">
                Your interviews are enhanced with AI for question generation, answer evaluation, and performance analysis. 
                Get personalized feedback to improve your interview skills.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Total Interviews</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">AI</span>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {dashboardData?.totalInterviews || 0}
            </div>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Completed Interviews</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">AI</span>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {dashboardData?.completedInterviews || 0}
            </div>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Average Score</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">AI</span>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {dashboardData?.averageScore || 0}%
            </div>
          </Card>
        </div>

        <Card title="Recent AI-Enhanced Interviews" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="space-y-4">
            {dashboardData?.recentInterviews?.map((interview) => (
              <div
                key={interview.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-xs px-2 py-1 rounded-full animate-pulse">
                    <span>✨</span>
                    <span>AI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{interview.role}</h4>
                    <p className="text-sm text-gray-600">{interview.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {interview.score}%
                    </span>
                    <p className="text-xs text-gray-500">AI Score</p>
                  </div>
                  <Button
                    onClick={() => navigate(`/result/${interview.id}`)}
                    variant="secondary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            onClick={() => navigate('/interview-setup')} 
            className="w-full animate-glow"
          >
            🚀 Start New Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;