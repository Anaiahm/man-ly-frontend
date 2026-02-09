function ProfilePicture({ user }: { user: { id: string; name: string; profilePictureUrl?: string } }) {
    const showMenu = () => {
      // Placeholder for showing a dropdown menu or profile options
      alert(`Profile options for ${user.name}`);
    };
  return (
    <img
      onClick={showMenu}
      src={user.profilePictureUrl || 'https://imgur.com/2hRFdtf.png'}
      alt={`${user.name}'s profile`}
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    />
  );
}

export default ProfilePicture;