import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { AuthState } from './types/auth';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

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
    })
  }

  // mock logout
  const mockLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    })
  }

  return (
    <Router>
      <NavBar 
        auth={auth}
        onLogout={mockLogout}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn onLogin={mockLogin}/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
