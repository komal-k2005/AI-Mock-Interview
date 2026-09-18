import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { signInWithGoogle, registerWithEmailPassword } from '../services/firebase';
import Button from '../components/Button';
import Card from '../components/Card';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    try {
      const firebaseResult = await registerWithEmailPassword(
        formData.email, 
        formData.password, 
        formData.name
      );
      
      if (firebaseResult.success) {
        setSuccess(firebaseResult.message);
        try {
          await authAPI.register(formData);
        } catch (backendErr) {
        }
        
        setTimeout(() => {
          navigate('/email-verification');
        }, 2000);
      } else {
        setError(firebaseResult.error);
      }
    } catch (err) {
      try {
        const response = await authAPI.register(formData);
        setSuccess(response.data.message || 'Registration successful');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (backendErr) {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
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
      setError('Google Sign-In failed. Please try again, or use email registration instead.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md animate-fade-in shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-slate-800">
            Create Account
          </h2>
          <p className="text-slate-600 mt-2">Start your AI-powered interview practice</p>
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
        
        <Button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          variant="secondary"
          className="w-full mb-6 flex items-center justify-center space-x-2 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>{googleLoading ? 'Signing up with Google...' : 'Sign up with Google'}</span>
        </Button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
              minLength="6"
              placeholder="Create a password"
            />
            <p className="text-xs text-slate-500 mt-1">Minimum 6 characters</p>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
        <p className="text-center mt-4 text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
