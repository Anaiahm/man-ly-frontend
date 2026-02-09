import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Provider } from '../types/provider';
import { fetchCareTeam, removeFromCareTeam } from '../api/careTeam';

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
        if (!cancelled) setError(e instanceof Error ? e.message : 'Unknown error');
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

  return (
    <>
      <div style={{ padding: 16 }}>
        <h1>Hey, Man*ly Man!</h1>
        <p style={{ opacity: 0.8 }}>User ID: {userId}</p>
      </div>

      <div style={{ padding: 16 }}>
        <h2>Your Care Team!</h2>

        {loading ? <p>Loading your care team...</p> : null}
        {error ? <p style={{ color: 'tomato' }}>{error}</p> : null}

        {!loading && !error && providers.length === 0 ? (
          <p>You don’t have any providers on your care team yet.</p>
        ) : null}

        {!loading && !error && providers.length > 0 ? (
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            {/* LEFT: list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, minWidth: 320 }}>
              {providers.map((p) => (
                <li
                  key={p.id}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.12)',
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ opacity: 0.85 }}>{p.title}</div>

                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <button onClick={() => setSelected(p)}>View Info</button>
                    <button onClick={() => handleRemove(p.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            {/* RIGHT: detail panel */}
            <div style={{ flex: 1, padding: 12, border: '1px solid rgba(0,0,0,0.12)' }}>
              {selected ? (
                <>
                  <h3 style={{ marginTop: 0 }}>{selected.name}</h3>
                  <p><strong>Title:</strong> {selected.title}</p>
                  <p><strong>Category:</strong> {selected.category}</p>
                  <p style={{ marginTop: 12 }}>{selected.bio}</p>
                </>
              ) : (
                <p>Click “View Info” on a provider to see details.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Keep the rest hardcoded for MVP */}
      <div style={{ padding: 16 }}>
        <h2>Your Upcoming Appointments</h2>
        <ul>
          <li>Appointment 1: June 15, 2024 at 10:00 AM with Dr. Smith</li>
          <li>Appointment 2: July 20, 2024 at 2:00 PM with Dr. Johnson</li>
        </ul>
      </div>

      <div style={{ padding: 16 }}>
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