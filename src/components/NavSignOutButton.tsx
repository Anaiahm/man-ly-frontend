
type Props = {
    onClick: () => void;
};

function SignOutButton({ onClick }: Props) {
  return (
    <button onClick={onClick} className="sign-out-button">
      Sign Out
    </button>
  );
}

export default SignOutButton;