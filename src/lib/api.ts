const BASE_URL = process.env.DATALAYER_API_URL ?? 'https://api.datalayer.dev';
const API_KEY = process.env.DATALAYER_API_KEY;

function assertKey(): string {
  if (!API_KEY) throw new Error('DATALAYER_API_KEY environment variable is not set. Get your key at https://app.datalayer.dev');
  return API_KEY;
}

export async function apiGet(path: string, params?: Record<string, string>): Promise<any> {
  const key = assertKey();
  const url = new URL(path, BASE_URL);
  if (params) Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });

  const res = await fetch(url.toString(), {
    headers: { 'X-API-Key': key, 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `API error: ${res.status}`);
  }

  return res.json();
}

export async function apiPost(path: string, body: Record<string, unknown>): Promise<any> {
  const key = assertKey();

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'X-API-Key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? `API error: ${res.status}`);
  }

  return res.json();
}
