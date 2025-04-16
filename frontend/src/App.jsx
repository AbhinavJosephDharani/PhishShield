import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PublicLayout from './components/PublicLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PhishingSimulation from './pages/PhishingSimulation';
import Home from './pages/Home';
import Features from './pages/Features';
import Community from './pages/Community';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Simulation from './pages/Simulation';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

const AuthLayout = ({ children, onLogout }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar onLogout={onLogout} />
      {children}
    </>
  );
};

function App() {
  const { logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthLayout onLogout={logout}>
                <Dashboard />
              </AuthLayout>
            }
          />
          <Route
            path="/phishing-simulation"
            element={
              <AuthLayout onLogout={logout}>
                <PhishingSimulation />
              </AuthLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthLayout onLogout={logout}>
                <Profile />
              </AuthLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthLayout onLogout={logout}>
                <Settings />
              </AuthLayout>
            }
          />
          <Route
            path="/simulation/:id"
            element={
              <AuthLayout onLogout={logout}>
                <Simulation />
              </AuthLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

// Wrap the App with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;
