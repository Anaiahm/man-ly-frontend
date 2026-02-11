import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInButton from '../components/SignInButton';
import { API_BASE_URL } from '../config';
import './SignIn.css';

type SignInProps = {
  onLogin: (user: { id: string; name: string; email: string; profilePhotoUrl: string }) => void;
};

function SignIn({ onLogin }: SignInProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert(msg || 'Login failed');
      return;
    }

    const data: { userId: number; username: string; name: string } = await res.json();

    const user = {
      id: String(data.userId),
      name: data.name,
      email: '', 
      profilePhotoUrl: '', 
    };
    // persist login
    localStorage.setItem('authUser', JSON.stringify(user));

    // update app-level state (if you use it)
    onLogin(user);

    // navigate using the REAL userId from backend
    navigate(`/${data.userId}/dashboard`);
  } catch {
    alert('Network error. Please try again.');
  }
  };


  return (
    <div className="sign-in">
      <h1>Sign In</h1>

      <form className="sign-in__form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <SignInButton onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
}

export default SignIn;