import NavSignInButton from './NavSignInButton';
import NavSignUpButton from './NavSignUpButton';
// import NavSignOutButton from './NavSignOutButton';
// import ProfilePicture from './ProfilePicture';
// import DashboardLink from './DashboardLink';
import ProfileMenu from './ProfileMenu';
import type { AuthState } from '../types/auth';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
// import AboutPageButton from './AboutPageButton';

export type NavBarProps = {
  auth: AuthState;
  onLogout: () => void;
};

function NavBar({ auth, onLogout }: NavBarProps) {
  const Navigate = useNavigate();

//   const handleLogout = () => {
//     onLogout();
//     Navigate('/');
// }

  return (
    <nav className="navbar">
      <button id='logo-button' onClick={() => Navigate('/')}>
        <img id="Logo" src='https://imgur.com/qFsePfo.png' alt="Manly Logo" />
      </button>
      <section className="nav-buttons">
        {!auth.isAuthenticated ? (
          <>
            {/* <AboutPageButton /> */}
            <NavSignInButton/>
            <NavSignUpButton />
          </>
        ) : (
          <>
            {/* <ProfilePicture user={auth.user!} /> */}
            {/* <DashboardLink userId={auth.user!.id} /> */}
            <ProfileMenu auth={auth} onLogout={onLogout} />
            {/* <NavSignOutButton onClick={handleLogout} /> */}
          </>
        )}
      </section>
    </nav>
  );
};

export default NavBar;