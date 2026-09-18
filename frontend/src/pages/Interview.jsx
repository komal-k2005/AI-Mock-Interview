import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewAPI, questionAPI } from '../services/api';
import QuestionCard from '../components/QuestionCard';
import Button from '../components/Button';

const Interview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await interviewAPI.getQuestions(id);
        setQuestions(response.data.questions);
        setAiEnabled(response.data.aiEnabled || false);
        setInterviewData(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    setSubmitting(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const response = await questionAPI.submitAnswer(currentQuestion.id, { answerText: answer });
      setFeedback(response.data);
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setAnswer('');
          setFeedback(null);
        } else {
          navigate(`/result/${id}`);
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setFeedback(null);
      setShowHint(false);
    } else {
      navigate(`/result/${id}`);
    }
  };

  const handleGetHint = () => {
    setShowHint(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🤖</div>
          <div className="text-xl text-gray-600 font-medium">Loading interview...</div>
          <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <div className="text-xl text-gray-600">No questions found for this interview.</div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-800">AI Interview</h1>
            {aiEnabled && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm">
                <span className="animate-pulse">●</span>
                <span>AI Powered</span>
              </div>
            )}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-800"
          >
            Exit Interview
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Progress: {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          aiEnabled={aiEnabled}
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Answer</h3>
            {aiEnabled && (
              <button
                onClick={handleGetHint}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                💡 Get AI Hint
              </button>
            )}
          </div>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          
          {showHint && aiEnabled && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 AI Hint</h4>
              <p className="text-yellow-700 text-sm">
                Consider mentioning your specific experience with relevant technologies, provide concrete examples from past projects, and explain your thought process clearly.
              </p>
            </div>
          )}
          
          {feedback && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-green-800">🤖 AI Feedback</h4>
                {aiEnabled && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600">AI Score:</span>
                    <span className="text-2xl font-bold text-green-700">{feedback.score}/100</span>
                  </div>
                )}
              </div>
              <p className="text-green-700 mb-3">{feedback.feedback}</p>
              {feedback.assessment && (
                <div className="bg-white bg-opacity-50 p-3 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Detailed Assessment:</h5>
                  <p className="text-sm text-green-700">{feedback.assessment}</p>
                </div>
              )}
              {!aiEnabled && (
                <p className="text-xs text-gray-500 mt-2 italic">
                  * Add OpenAI API key to enable AI-powered evaluation
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              onClick={handleNextQuestion}
              variant="secondary"
              disabled={submitting}
            >
              Skip Question
            </Button>
            <Button
              onClick={handleSubmitAnswer}
              disabled={submitting || !answer.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Answer'}
            </Button>
          </div>
        </div>

        {/* AI Info Panel */}
        {aiEnabled && (
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🤖</div>
              <div>
                <h4 className="font-semibold text-indigo-800 mb-1">AI Features Active</h4>
                <p className="text-sm text-indigo-700">
                  This interview uses AI to generate relevant questions and provide intelligent feedback on your answers. 
                  Your responses are analyzed for completeness, technical accuracy, and communication skills.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {!aiEnabled && (
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-orange-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">AI Currently Disabled</h4>
                <p className="text-sm text-gray-700">
                  AI features are currently disabled due to OpenAI API credit limits. 
                  The app is using high-quality placeholder questions instead. 
                  Add credits to your OpenAI account to enable AI-generated questions and feedback.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;