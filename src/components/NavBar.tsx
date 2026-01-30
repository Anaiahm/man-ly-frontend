import NavSignInButton from './NavSignInButton';
import NavSignUpButton from './NavSignUpButton';
import NavSignOutButton from './NavSignOutButton';
import type { AuthState } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export type NavBarProps = {
  auth: AuthState;
  onLogout: () => void;
};

function NavBar({ auth, onLogout }: NavBarProps) {
  const Navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    Navigate('/');
}

  return (
    <nav className="navbar">
      <button onClick={() => Navigate('/')}>
        <img id="Logo" src='https://imgur.com/qFsePfo.png' alt="Manly Logo" />
      </button>
      <section className="nav-buttons">
        {!auth.isAuthenticated ? (
          <>
          <NavSignInButton/>
          <NavSignUpButton />
          </>
        ) : (
          <>
          <NavSignOutButton onClick={handleLogout} />
          </>
        )}
      </section>
    </nav>
  );
};

export default NavBar;