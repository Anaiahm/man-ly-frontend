import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthState } from '../types/auth';
import './ProfileMenu.css';
import DashboardLink from './DashboardLink';
import PlaceholderPfp from '../assets/images/PfpPlaceholder.png';

type ProfileMenuProps = {
  auth: AuthState;
  onLogout: () => void;
};

function ProfileMenu({ auth, onLogout }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!auth.isAuthenticated || !auth.user) return null;

  const userId = auth.user.id;

  const handleLogout = () => {
    onLogout();
    setOpen(false);
    navigate('/');
  };

  const handleSettings = () => {
    setOpen(false);
    navigate(`/${userId}/settings`);
  };

  const handleAddProviders = () => {
    setOpen(false);
    navigate(`/${userId}/provider-search`);
  };

  const photoUrl = auth.user.profilePhotoUrl || PlaceholderPfp;

  return (
    <div className="profile-menu" ref={ref}>
      <button
        className="profile-menu__trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img
          className="profile-menu__avatar"
          src={photoUrl}
          alt="Profile"
        />
      </button>

      {open && (
        <div className="profile-menu__dropdown" role="menu">
            
            <button className="profile-menu__item" role="menuitem" onClick={() => navigate(`/${userId}/dashboard`)}>
              <DashboardLink />
            </button>

          <button
            className="profile-menu__item"
            onClick={handleAddProviders}
            role="menuitem"
          >
            Add Providers
          </button>

          <button
            className="profile-menu__item"
            onClick={handleSettings}
            role="menuitem"
          >
            Settings
          </button>

          <button
            className="profile-menu__item danger"
            onClick={handleLogout}
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;