import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import type { AuthState } from './types/auth';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';

function AppShell() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });

  // mock login
  const mockLogin = () => {
    setAuth({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      }
    });
  };

  // mock logout + redirect home
  const mockLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    });
    navigate('/');
  };

  return (
    <>
      <NavBar auth={auth} onLogout={mockLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* MVP: always redirect to demo user dashboard */}
        <Route path="/signin" element={<SignIn onLogin={mockLogin} authUserId="1" />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/:userId/dashboard" element={<UserDashboard />} />

        {/* later: protect these */}
        <Route path="/:userId/settings" element={<div>Settings Page - Protected</div>} />
        <Route path="/:userId/provider-search" element={<div>Provider Search Page - Protected</div>} />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;