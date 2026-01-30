import './NavSignInButton.css';

type Props = {
    onClick: () => void;
};

function SignInButton({ onClick }: Props) {
    return (
        <button onClick={onClick}>
            Sign In
        </button>
    );
};

export default SignInButton;