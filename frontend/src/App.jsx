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

const AuthLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          } />
          <Route path="/phishing-simulation" element={
            <AuthLayout>
              <PhishingSimulation />
            </AuthLayout>
          } />
          <Route path="/simulation/:id" element={
            <AuthLayout>
              <Simulation />
            </AuthLayout>
          } />
          <Route path="/profile" element={
            <AuthLayout>
              <Profile />
            </AuthLayout>
          } />
          <Route path="/settings" element={
            <AuthLayout>
              <Settings />
            </AuthLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
