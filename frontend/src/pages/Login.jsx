import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { signInWithGoogle, loginWithEmailPassword } from '../services/firebase';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
      // Try Firebase authentication first
      const firebaseResult = await loginWithEmailPassword(formData.email, formData.password);
      
      if (firebaseResult.success) {
        // Send token to backend for verification
        try {
          const response = await authAPI.googleAuth({ idToken: firebaseResult.idToken });
          localStorage.setItem('token', response.data.token || firebaseResult.idToken);
          localStorage.setItem('user', JSON.stringify({
            email: response.data.email || firebaseResult.user.email,
            name: response.data.name || firebaseResult.user.displayName,
            emailVerified: response.data.emailVerified || firebaseResult.user.emailVerified,
            authProvider: 'EMAIL'
          }));
          navigate('/dashboard');
        } catch (backendErr) {
          // If backend fails, still log in with Firebase token
          localStorage.setItem('token', firebaseResult.idToken);
          localStorage.setItem('user', JSON.stringify({
            email: firebaseResult.user.email,
            name: firebaseResult.user.displayName,
            emailVerified: firebaseResult.user.emailVerified,
            authProvider: 'EMAIL'
          }));
          navigate('/dashboard');
        }
      } else {
        setError(firebaseResult.error);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    localStorage.clear();
    setError('');
    setFormData({ email: '', password: '' });
    alert('Cache cleared. Please try logging in again.');
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        // Send token to backend for verification
        try {
          const response = await authAPI.googleAuth({ idToken: result.idToken });
          localStorage.setItem('token', response.data.token || result.idToken);
          localStorage.setItem('user', JSON.stringify({
            email: response.data.email || result.user.email,
            name: response.data.name || result.user.displayName,
            emailVerified: response.data.emailVerified || result.user.emailVerified,
            authProvider: 'GOOGLE',
            firebaseUid: response.data.firebaseUid || result.user.uid
          }));
          navigate('/dashboard');
        } catch (backendErr) {
          // If backend fails, still log in with Firebase token
          localStorage.setItem('token', result.idToken);
          localStorage.setItem('user', JSON.stringify({
            email: result.user.email,
            name: result.user.displayName,
            emailVerified: result.user.emailVerified,
            authProvider: 'GOOGLE',
            firebaseUid: result.user.uid
          }));
          navigate('/dashboard');
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Google Sign-In error:', err);
      setError('Google Sign-In failed. Please try again, or use email login instead.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 animate-slide-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-bounce">🤖</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-2">Sign in to continue your AI interview practice</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 animate-shimmer">
            {error}
            <button
              onClick={handleClearCache}
              className="block mt-2 text-sm text-red-700 underline hover:text-red-800"
            >
              Clear cache and try again
            </button>
          </div>
        )}
        
        <Button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          variant="secondary"
          className="w-full mb-6 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>{googleLoading ? 'Signing in with Google...' : 'Sign in with Google'}</span>
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 focus:shadow-lg"
              required
            />
            <div className="text-right mt-2">
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;