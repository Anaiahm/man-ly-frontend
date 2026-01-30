import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <img id="Logo" src='https://imgur.com/qFsePfo.png' alt="Manly Logo" />
      <section className="nav-buttons">
        <SignInButton />
        <SignUpButton />
      </section>
    </nav>
  );
};

export default NavBar;