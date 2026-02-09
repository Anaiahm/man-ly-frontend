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

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const [settings, setSettings] = useState<UserSettings>({
    selectedCategories: ['MENTAL_HEALTH', 'MENTORSHIP_CAREER'],
    profilePhotoUrl: '',
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
  });

  const mockLogin = () => {
    setAuth({
      isAuthenticated: true,
      user: {
        id: '1',
        name: settings.name,
        email: settings.email,
        profilePhotoUrl: settings.profilePhotoUrl,
      },
    });
  };

  const mockLogout = () => {
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
      <NavBar auth={auth} onLogout={mockLogout} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/signin"
          element={<SignIn onLogin={mockLogin} authUserId={auth.user?.id || '1'} />}
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