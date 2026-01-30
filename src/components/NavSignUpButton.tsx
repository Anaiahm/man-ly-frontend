import { Link } from "react-router-dom";

function SignUpButton() {
  return (
    <button className="sign-up-button">
      <Link to="/signup" className="sign-up-button-link">
        Sign Up
      </Link>
    </button>
  );
};

export default SignUpButton;