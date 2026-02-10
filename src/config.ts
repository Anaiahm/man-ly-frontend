export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

if (!API_BASE_URL) {
  throw new Error("Missing VITE_API_BASE_URL. Set it in .env.local (dev) and Netlify env vars (prod).");
}
