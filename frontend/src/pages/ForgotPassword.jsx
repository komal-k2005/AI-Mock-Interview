import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/firebase';
import Button from '../components/Button';
import Card from '../components/Card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setSuccess('Password reset email sent! Please check your inbox.');
        setEmail('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 animate-slide-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce">🔑</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Forgot Password
          </h2>
          <p className="text-gray-600 mt-2">Reset your password to continue</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 animate-shimmer">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 animate-shimmer">
            {success}
          </div>
        )}
        
        <p className="text-gray-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 focus:shadow-lg"
              required
              placeholder="Enter your email"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <Link to="/login" className="block text-orange-600 hover:text-orange-800 font-medium transition-colors">
            Back to Login
          </Link>
          <Link to="/register" className="block text-gray-600 hover:text-gray-800 transition-colors">
            Don't have an account? Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
