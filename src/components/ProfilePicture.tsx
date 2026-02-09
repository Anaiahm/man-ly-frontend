import type { user } from '../types/auth';
import PlaceholderPfp from '../assets/placeholder-pfp.png';

type Props = {
  user: user;
  onClick?: () => void; // optional if you want the parent to control menu opening
};

function ProfilePicture({ user, onClick }: Props) {
  return (
    <img
      onClick={onClick}
      // src={user.profilePhotoUrl || 'https://imgur.com/2hRFdtf.png'}
      src={user.profilePhotoUrl || PlaceholderPfp}
      alt={`${user.name}'s profile`}
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    />
  );
}

export default ProfilePicture;