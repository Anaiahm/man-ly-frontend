import SignInButton from '../components/SignInButton';

type SignInProps = {
  onLogin: () => void;
};

function SignIn({ onLogin }: SignInProps) {
  return (
    <div>
        <p> SignIn Page</p>
        <SignInButton onClick={onLogin} />
    </div>

  )
}

export default SignIn