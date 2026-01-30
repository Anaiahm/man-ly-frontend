import { Link } from 'react-router-dom';

function SignInButton() {
    return (
        <button>
        <Link to="/signin" className="sign-in-button">
            Sign In
        </Link>
        </button>
    );
};

export default SignInButton;