import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import AuthLayout from './components/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Features from './pages/Features';
import Community from './pages/Community';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Simulation from './pages/Simulation';
import { AuthProvider } from './context/AuthContext';

// Trigger redeployment - testing login functionality
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/features" element={<Features />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <AuthLayout>
              <Dashboard />
            </AuthLayout>
          } />
          <Route path="/simulation" element={
            <AuthLayout>
              <Simulation />
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