import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Provider } from '../types/provider';
import { fetchAllProviders, addToCareTeam } from '../api/careTeam';
import './ProviderSearch.css';

type FilterMode = 'all' | 'category' | 'name' | 'myCategories';

function ProviderSearch() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // filter state
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [nameQuery, setNameQuery] = useState('');

  // mock user-selected categories (replace later with real data)
  const myCategories = ['Mental Health', 'Career'];

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

  // stable list of unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(providers.map((p) => p.category)));
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  }, [providers]);

  // stable ordering overall (category -> name)
  const sortedProviders = useMemo(() => {
    const copy = [...providers];
    copy.sort((a, b) => {
      const cat = a.category.localeCompare(b.category);
      if (cat !== 0) return cat;
      return a.name.localeCompare(b.name);
    });
    return copy;
  }, [providers]);

  // one place to handle mode changes (prevents weird carryover)
  const switchMode = (mode: FilterMode) => {
    setFilterMode(mode);

    // Clear irrelevant inputs so modes feel independent and predictable
    if (mode !== 'name') setNameQuery('');

    // If switching to category, ensure we have a category selected
    if (mode === 'category') {
      if (!selectedCategory && categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    }
  };

  // if data arrives and we're in category mode with no selection yet
  useEffect(() => {
    if (filterMode === 'category' && !selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [filterMode, selectedCategory, categories]);

  const filteredProviders = useMemo(() => {
    if (filterMode === 'all') return sortedProviders;

    if (filterMode === 'category') {
      if (!selectedCategory) return sortedProviders;
      return sortedProviders.filter((p) => p.category === selectedCategory);
    }

    if (filterMode === 'name') {
      const q = nameQuery.trim().toLowerCase();
      if (!q) return sortedProviders;
      return sortedProviders.filter((p) => p.name.toLowerCase().includes(q));
    }

    // myCategories
    return sortedProviders.filter((p) => myCategories.includes(p.category));
  }, [sortedProviders, filterMode, selectedCategory, nameQuery, myCategories]);

  const emptyMessage = useMemo(() => {
    if (loading) return '';
    if (error) return '';
    if (filteredProviders.length > 0) return '';

    if (filterMode === 'name') return 'No providers match that name.';
    if (filterMode === 'category') return 'No providers found in that category.';
    if (filterMode === 'myCategories') return 'No providers match your selected categories yet.';
    return 'No providers found.';
  }, [loading, error, filteredProviders.length, filterMode]);

  return (
    <div className="provider-search">
      <h1>Add Providers</h1>
      <p>Select providers to add to your care team.</p>

      {/* TOGGLES */}
      <div className="filter-toggles" data-active={filterMode}>
        <span className="indicator" />

        <button
          className={filterMode === 'all' ? 'active' : ''}
          onClick={() => switchMode('all')}
          type="button"
        >
          All
        </button>

        <button
          className={filterMode === 'category' ? 'active' : ''}
          onClick={() => switchMode('category')}
          type="button"
        >
          Category
        </button>

        <button
          className={filterMode === 'name' ? 'active' : ''}
          onClick={() => switchMode('name')}
          type="button"
        >
          Name
        </button>

        <button
          className={filterMode === 'myCategories' ? 'active' : ''}
          onClick={() => switchMode('myCategories')}
          type="button"
        >
          My Categories
        </button>
      </div>

      {/* ✅ Stable filter panel so layout doesn't jump between modes */}
      <div className="filter-panel">
        {filterMode === 'category' && (
          <div className="filter-control">
            {categories.map((cat) => (
              <button
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filterMode === 'name' && (
          <input
            className="name-search"
            type="text"
            placeholder="Search by name..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
          />
        )}
      </div>

      {loading && <p>Loading providers...</p>}
      {error && <p className="error">{error}</p>}
      {!!emptyMessage && <p className="empty">{emptyMessage}</p>}

      <div className="provider-grid">
        {filteredProviders.map((p) => (
          <div key={p.id} className="provider-card">
            <h3>{p.name}</h3>
            <p className="provider-title">{p.title}</p>
            <p className="provider-category">{p.category}</p>
            <p className="provider-bio">{p.bio}</p>

            <button onClick={() => handleAdd(p.id)} type="button">
              Add to Care Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderSearch;
