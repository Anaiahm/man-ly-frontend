import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthState } from '../types/auth';
import type { CareTeamCategory, UserSettings } from '../types/settings';
import './Settings.css';

type SettingsProps = {
  auth: AuthState;
  settings: UserSettings;
  onSaveSettings: (next: UserSettings) => void;
};

const ALL_CATEGORIES: { key: CareTeamCategory; label: string }[] = [
  { key: 'MENTAL_HEALTH', label: 'Mental Health' },
  { key: 'MENTORSHIP_FINANCIAL', label: 'Mentorship: Financial' },
  { key: 'MENTORSHIP_CAREER', label: 'Mentorship: Career' },
  { key: 'MENTORSHIP_FAMILY', label: 'Mentorship: Family' },
  { key: 'MENTORSHIP_PERSONAL', label: 'Mentorship: Personal' },
];

function Settings({ auth, settings, onSaveSettings }: SettingsProps) {
  const navigate = useNavigate();

  // basic route protection
  if (!auth.isAuthenticated || !auth.user) {
    navigate('/signin');
    return null;
  }

  const [draft, setDraft] = useState<UserSettings>(settings);

  const toggleCategory = (cat: CareTeamCategory) => {
    setDraft(prev => {
      const exists = prev.selectedCategories.includes(cat);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter(c => c !== cat)
          : [...prev.selectedCategories, cat],
      };
    });
  };

  const handleSave = () => {
    onSaveSettings(draft);
    navigate(`/${auth.user!.id}/dashboard`);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Care team categories</h2>
        <p>Select what types of providers you want to see.</p>

        <div className="settings-grid">
          {ALL_CATEGORIES.map(cat => (
            <label key={cat.key} className="settings-checkbox">
              <input
                type="checkbox"
                checked={draft.selectedCategories.includes(cat.key)}
                onChange={() => toggleCategory(cat.key)}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h2>Profile picture</h2>
        <div className="settings-row">
          <input
            type="text"
            placeholder="Profile photo URL"
            value={draft.profilePhotoUrl}
            onChange={e => setDraft(prev => ({ ...prev, profilePhotoUrl: e.target.value }))}
          />
        </div>
      </section>

      <section className="settings-section">
        <h2>Profile info</h2>

        <div className="settings-row">
          <label>Name</label>
          <input
            type="text"
            value={draft.name}
            onChange={e => setDraft(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="settings-row">
          <label>Username</label>
          <input
            type="text"
            value={draft.username}
            onChange={e => setDraft(prev => ({ ...prev, username: e.target.value }))}
          />
        </div>

        <div className="settings-row">
          <label>Email</label>
          <input
            type="email"
            value={draft.email}
            onChange={e => setDraft(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div className="settings-row">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={() => {
              // MVP: don’t store password in settings state yet
            }}
          />
          <small>(MVP: password updates later when backend auth is real)</small>
        </div>
      </section>

      <div className="settings-actions">
        <button className="secondary" onClick={() => navigate(-1)}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Settings;