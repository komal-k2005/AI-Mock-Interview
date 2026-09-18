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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-in shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="text-3xl font-bold text-slate-800">
            Forgot Password
          </h2>
          <p className="text-slate-600 mt-2">Reset your password to continue</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}
        
        <p className="text-slate-600 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
          <Link to="/login" className="block text-blue-600 hover:text-blue-800 font-semibold">
            Back to Login
          </Link>
          <Link to="/register" className="block text-slate-600 hover:text-slate-800">
            Don't have an account? Register
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
