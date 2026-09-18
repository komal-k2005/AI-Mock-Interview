import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { reloadUser, getCurrentUser } from '../services/firebase';
import Button from '../components/Button';
import Card from '../components/Card';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const user = getCurrentUser();
        if (!user) {
          setStatus('error');
          setMessage('No user logged in. Please login first.');
          return;
        }

        // Reload user to get latest email verification status
        const result = await reloadUser();
        
        if (result.success && result.user.emailVerified) {
          setStatus('success');
          setMessage('Email verified successfully! Redirecting to dashboard...');
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setStatus('pending');
          setMessage('Email not yet verified. Please check your email and click the verification link.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Error checking email verification status.');
      }
    };

    checkEmailVerification();
  }, [navigate]);

  const handleResendVerification = async () => {
    try {
      const user = getCurrentUser();
      if (user) {
        await user.sendEmailVerification();
        setStatus('pending');
        setMessage('Verification email sent again. Please check your inbox.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error sending verification email.');
    }
  };

  const handleContinueAnyway = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Email Verification</h2>
        
        {status === 'loading' && (
          <div className="text-gray-600">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p>Checking email verification status...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-green-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">{message}</p>
          </div>
        )}

        {status === 'pending' && (
          <div>
            <div className="text-yellow-600 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">{message}</p>
            </div>
            <div className="space-y-3">
              <Button onClick={handleResendVerification} className="w-full">
                Resend Verification Email
              </Button>
              <Button onClick={handleContinueAnyway} variant="secondary" className="w-full">
                Continue Anyway (Not Recommended)
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg">{message}</p>
            <Button onClick={() => navigate('/login')} className="mt-4">
              Go to Login
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EmailVerification;