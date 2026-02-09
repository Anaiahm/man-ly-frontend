import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Provider } from '../types/provider';
import { fetchAllProviders, addToCareTeam } from '../api/careTeam';
import './ProviderSearch.css';

function ProviderSearch() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchAllProviders();
        setProviders(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load providers');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const handleAdd = async (providerId: number) => {
    try {
      await addToCareTeam(providerId);
      navigate(`/${userId}/dashboard`);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to add provider');
    }
  };

  return (
    <div className="provider-search">
      <h1>Add Providers</h1>
      <p>Select providers to add to your care team.</p>

      {loading && <p>Loading providers...</p>}
      {error && <p className="error">{error}</p>}

      <div className="provider-grid">
        {providers.map((p) => (
          <div key={p.id} className="provider-card">
            <h3>{p.name}</h3>
            <p className="provider-title">{p.title}</p>
            <p className="provider-category">{p.category}</p>
            <p className="provider-bio">{p.bio}</p>

            <button onClick={() => handleAdd(p.id)}>
              Add to Care Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderSearch;