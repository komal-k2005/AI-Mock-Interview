import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const InterviewSetup = lazy(() => import('./pages/InterviewSetup'));
const Interview = lazy(() => import('./pages/Interview'));
const Result = lazy(() => import('./pages/Result'));
const Profile = lazy(() => import('./pages/Profile'));
const EmailVerification = lazy(() => import('./pages/EmailVerification'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-6xl mb-4 animate-bounce">🤖</div>
      <div className="text-xl text-gray-600 font-medium">Loading...</div>
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-setup"
              element={
                <ProtectedRoute>
                  <InterviewSetup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview/:id"
              element={
                <ProtectedRoute>
                  <Interview />
                </ProtectedRoute>
            }
            />
            <Route
              path="/result/:id"
              element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/email-verification"
              element={
                <ProtectedRoute>
                  <EmailVerification />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;