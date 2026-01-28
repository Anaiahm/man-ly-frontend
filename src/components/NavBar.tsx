// import ManlyLogo from '../images/ManlyLogo';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <img id="Logo" src="/src/assets/images/ManlyLogo.jpg" alt="Manly Logo" />
      <section className="nav-buttons">
        <SignInButton />
        <SignUpButton />
      </section>
    </nav>
  );
};

export default NavBar;