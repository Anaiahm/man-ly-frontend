import type { Provider } from '../types/provider';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchCareTeam(): Promise<Provider[]> {
  const res = await fetch(`${API_BASE}/care-team`);
  if (!res.ok) throw new Error(`Failed to load care team (${res.status})`);
  return res.json();
}

export async function removeFromCareTeam(providerId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/care-team/${providerId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to remove provider (${res.status})`);
}