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
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <PublicLayout>
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  </PublicLayout>
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <PublicLayout>
                    <Register setIsAuthenticated={setIsAuthenticated} />
                  </PublicLayout>
                )
              }
            />

            {/* Authenticated Routes */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <AuthLayout onLogout={handleLogout}>
                    <Dashboard />
                  </AuthLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/phishing-simulation"
              element={
                isAuthenticated ? (
                  <AuthLayout onLogout={handleLogout}>
                    <PhishingSimulation />
                  </AuthLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/features"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <Features />
                </AuthLayout>
              }
            />
            <Route
              path="/community"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <Community />
                </AuthLayout>
              }
            />
            <Route
              path="/about"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <About />
                </AuthLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <Profile />
                </AuthLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <Settings />
                </AuthLayout>
              }
            />
            <Route
              path="/simulation/:id"
              element={
                <AuthLayout onLogout={handleLogout}>
                  <Simulation />
                </AuthLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
