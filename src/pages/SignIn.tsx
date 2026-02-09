import SignInButton from '../components/SignInButton';
import { useNavigate } from 'react-router-dom';

type SignInProps = {
  onLogin: () => void;
  authUserId: string;
};

function SignIn({ onLogin, authUserId }: SignInProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate(`/${authUserId}/dashboard`);
  };

  return (
    <div style={{ padding: 16 }}>
      <p>Sign In Page</p>
      <SignInButton onClick={handleLogin} />
    </div>
  );
}

export default SignIn;