import type { Provider } from '../types/provider';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --------------------
// Fetch current care team
// --------------------
export async function fetchCareTeam(): Promise<Provider[]> {
  const res = await fetch(`${API_BASE_URL}/care-team`);

  if (!res.ok) {
    throw new Error('Failed to load care team');
  }

  return res.json();
}

// --------------------
// Remove provider from care team
// --------------------
export async function removeFromCareTeam(providerId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/care-team/${providerId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to remove provider');
  }
}

// --------------------
// Fetch ALL providers (for search page)
// --------------------
export async function fetchAllProviders(): Promise<Provider[]> {
  const res = await fetch(`${API_BASE_URL}/providers`);

  if (!res.ok) {
    throw new Error('Failed to load providers');
  }

  return res.json();
}

// --------------------
// Add provider to care team
// --------------------
export async function addToCareTeam(providerId: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/care-team/${providerId}`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Failed to add provider to care team');
  }
}