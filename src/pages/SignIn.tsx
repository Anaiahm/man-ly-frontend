import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInButton from '../components/SignInButton';

type SignInProps = {
  onLogin: (username?: string) => void;
  authUserId: string;
};

function SignIn({ onLogin, authUserId }: SignInProps) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Fake login — accept anything
    onLogin(username);

    navigate(`/${authUserId}/dashboard`);
  };

  return (
    <div style={{ padding: 16, maxWidth: 400 }}>
      <h1>Sign In</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <SignInButton onClick={handleLogin} />
      </div>
    </div>
  );
}

export default SignIn;