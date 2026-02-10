import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { AuthState } from './types/auth';
import type { UserSettings } from './types/settings';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserDashboard from './pages/UserDashboard';
import Settings from './pages/Settings';
import ProviderSearch from './pages/ProviderSearch';
import About from './pages/About';
import ProviderInterest from './pages/ProviderInterest';

function App() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = localStorage.getItem('authUser');
    return stored
      ? { isAuthenticated: true, user: JSON.parse(stored) }
      : { isAuthenticated: false, user: null };
  });

  const [settings, setSettings] = useState<UserSettings>({
    selectedCategories: ['MENTAL_HEALTH', 'MENTORSHIP_CAREER'],
    profilePhotoUrl: '',
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
  });

  // const authUserId = auth.user?.id ?? '';

  const handleLogin = (user: AuthState['user']) => {
    if (!user) return;

    localStorage.setItem('authUser', JSON.stringify(user));

    setAuth({
      isAuthenticated: true,
      user,
    });
    };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setAuth({ isAuthenticated: false, user: null });
  };

  const handleSaveSettings = (next: UserSettings) => {
    setSettings(next);

    // Keep auth user in sync (so Nav updates immediately)
    setAuth(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          name: next.name,
          email: next.email,
          profilePhotoUrl: next.profilePhotoUrl,
        },
      };
    });
  };

  return (
    <Router>
      <NavBar auth={auth} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/providerinterest" element={<ProviderInterest />} />
        <Route
          path="/signin"
          element={<SignIn onLogin={handleLogin} />}
        />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/:userId/dashboard" element={<UserDashboard />} />

        <Route
          path="/:userId/settings"
          element={<Settings auth={auth} settings={settings} onSaveSettings={handleSaveSettings} />}
        />

        <Route 
        path="/:userId/provider-search" 
        element={<ProviderSearch />} 
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;