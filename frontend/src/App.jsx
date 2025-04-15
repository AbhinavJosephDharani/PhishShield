import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PhishingSimulation from './pages/PhishingSimulation';
import Home from './pages/Home';
import Features from './pages/Features';
import Community from './pages/Community';
import About from './pages/About';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Register setIsAuthenticated={setIsAuthenticated} />
              )
            } 
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/simulation"
            element={
              isAuthenticated ? (
                <PhishingSimulation />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/features" element={<Features />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
