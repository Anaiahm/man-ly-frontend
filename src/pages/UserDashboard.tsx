import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Provider } from '../types/provider';
import { fetchCareTeam, removeFromCareTeam } from '../api/careTeam';
import './UserDashboard.css';
import { API_BASE_URL } from '../config';

const MIN_CARE_TEAM_SIZE = 1;

function UserDashboard() {
  const { userId } = useParams();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selected, setSelected] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchCareTeam();
        if (!cancelled) setProviders(data);
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemove = async (providerId: number) => {
    try {
      await removeFromCareTeam(providerId);
      setProviders((prev) => prev.filter((p) => p.id !== providerId));
      if (selected?.id === providerId) setSelected(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to remove provider');
    }
  };

  const needsProviders = !loading && !error && providers.length < MIN_CARE_TEAM_SIZE;
  const hasProviders = !loading && !error && providers.length > 0;
  const providerSearchPath = userId ? `/${userId}/provider-search` : '/signin';

  console.log("API_BASE_URL =", API_BASE_URL);
  return (
    <>
      <div className="dashboard-header">
        <h1>Hey, Man*ly Man!</h1>
        {/* <p className="dashboard-subtle">User ID: {userId}</p> */}
      </div>

      <div className="Care-Team-Section">
        <h2>Your Care Team!</h2>

        {hasProviders && (
          <p className="care-team__helper">
            Click “View Info” on a provider to see details.
          </p>
        )}

        {needsProviders && (
          <div className="care-team__cta">
            <p className="care-team__status">
              Your care team is empty — add your first provider to get started.
            </p>

            <Link className="care-team__addLink" to={providerSearchPath}>
              + Add Providers
            </Link>
          </div>
        )}

        {loading && <p className="care-team__status">Loading your care team...</p>}
        {error && <p className="care-team__error">{error}</p>}

        {hasProviders && (
          <div className="care-team__layout">
            {/* LEFT: provider list */}
            <ul className="care-team__list">
              {providers.map((p) => (
                <li key={p.id} className="care-team__item">
                  <div className="care-team__name">{p.name}</div>
                  <div className="care-team__title">{p.title}</div>

                  <div className="care-team__actions">
                    <button className="care-team__btn" onClick={() => setSelected(p)}>View Info</button>
                    <button className="care-team__btn care-team__btn--danger" onClick={() => handleRemove(p.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {/* RIGHT: detail panel */}
            <div className="care-team__detail">
              {selected ? (
                <>
                  <h3 className="care-team__detailTitle">{selected.name}</h3>
                  <p className="care-team__detailRow">
                    <strong>Title:</strong> {selected.title}
                  </p>
                  <p className="care-team__detailRow">
                    <strong>Category:</strong> {selected.category}
                  </p>
                  <p className="care-team__bio">{selected.bio}</p>
                </>
              ) : (
                <p className="care-team__status">Select a provider from the list.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hardcoded sections for MVP */}
      <div className="dashboard-section">
        <h2>Your Upcoming Appointments</h2>
        <ul>
          <li>Appointment 1: June 15, 2024 at 10:00 AM with Dr. Smith</li>
          <li>Appointment 2: July 20, 2024 at 2:00 PM with Dr. Johnson</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h2>Upcoming Man*ly Events</h2>
        <ul>
          <li>Event 1: Man*ly Health Fair - June 25, 2024</li>
          <li>Event 2: Man*ly Wellness Workshop - July 10, 2024</li>
        </ul>
      </div>
    </>
  );
}

export default UserDashboard;