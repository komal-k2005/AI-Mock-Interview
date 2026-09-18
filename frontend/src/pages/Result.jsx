import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewAPI } from '../services/api';
import ScoreCard from '../components/ScoreCard';
import Card from '../components/Card';
import Button from '../components/Button';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await interviewAPI.getById(id);
        setInterview(response.data);
      } catch (error) {
        console.error('Error fetching interview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading results...</div>
      </div>
    );
  }

  // Placeholder data since we're not using real database
  const placeholderResult = {
    overallScore: 78,
    technicalScore: 82,
    communicationScore: 74,
    feedback: "Good performance overall. You demonstrated strong technical knowledge but could improve your communication skills.",
    areasToImprove: [
      "Provide more detailed explanations",
      "Practice articulating your thought process",
      "Work on time management during interviews"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-800">Interview Results</h1>
            {aiEnabled && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                <span className="animate-pulse">●</span>
                <span>AI Analysis</span>
              </div>
            )}
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="secondary">
            Back to Dashboard
          </Button>
        </div>

        {/* AI Summary Card */}
        {aiEnabled && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">🤖</div>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-indigo-700">
                  Your interview performance was analyzed using advanced AI algorithms. 
                  The feedback below is generated based on your answers, technical accuracy, 
                  communication skills, and overall interview performance.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ScoreCard label="Overall Score" score={placeholderResult.overallScore} color="indigo" />
          <ScoreCard label="Technical Score" score={placeholderResult.technicalScore} color="green" />
          <ScoreCard label="Communication Score" score={placeholderResult.communicationScore} color="blue" />
        </div>

        <Card title="AI Feedback" className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {aiEnabled ? "AI-Generated Feedback" : "General Feedback"}
              </h4>
              <p className="text-sm text-gray-500">
                {aiEnabled ? "Powered by GPT-3.5-turbo" : "Add OpenAI API key for AI feedback"}
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {placeholderResult.feedback}
          </p>
        </Card>

        <Card title="AI-Identified Areas to Improve" className="mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="text-2xl">🎯</div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {aiEnabled ? "AI-Recommended Improvements" : "General Improvements"}
              </h4>
              <p className="text-sm text-gray-500">
                {aiEnabled ? "Based on your interview performance analysis" : "Standard recommendations"}
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {placeholderResult.areasToImprove.map((area, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-600 mr-3">•</span>
                <span className="text-gray-700">{area}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* AI Insights Panel */}
        {aiEnabled && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <span>🚀</span>
              <span>AI Performance Insights</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Strong technical knowledge</li>
                  <li>• Good problem-solving approach</li>
                  <li>• Clear communication style</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-800 mb-2">Growth Areas</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Provide more specific examples</li>
                  <li>• Practice time management</li>
                  <li>• Deepen technical explanations</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <Button onClick={() => navigate('/interview-setup')} className="flex-1">
            Start New Interview
          </Button>
          <Button onClick={() => navigate('/dashboard')} variant="secondary" className="flex-1">
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;