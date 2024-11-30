export async function login(data: { username: string; password: string }) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('API URL not configured');
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}/auth/login/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}
