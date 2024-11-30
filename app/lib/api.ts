if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('API URL not configured');
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getToken = (): string | null => localStorage.getItem('token');

export async function fetchWithToken(resource: string, options: RequestInit) {
  const token = getToken();
  const url = `${baseUrl}/${resource}`;

  const res = await fetch(url, {
    ...options,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Unauthorized access
      throw new Error('Unauthorized access, redirecting to login.');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
}

export async function postRequest(resource: string, data?: any) {
  const token = getToken();
  const url = `${baseUrl}/${resource}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Unauthorized access
      throw new Error('Unauthorized access, redirecting to login.');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
}

export async function deleteRequest(resource: string) {
  const token = getToken();
  const url = `${baseUrl}/${resource}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Unauthorized access
      throw new Error('Unauthorized access, redirecting to login.');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
}

export async function putRequest(resource: string, data?: any) {
  const token = getToken();
  const url = `${baseUrl}/${resource}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Unauthorized access
      throw new Error('Unauthorized access, redirecting to login.');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
}

export async function downloadFile(
  resource: string,
  params?: Record<string, any>
) {
  const token = getToken();
  let url = `${baseUrl}/${resource}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      // Unauthorized access
      throw new Error('Unauthorized access, redirecting to login.');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  const blob = await res.blob();
  return blob;
}
