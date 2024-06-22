'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/navigation';

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api.almaher.xyz/api';

  const router = useRouter();

  const fetcher = async (resource: string, init: RequestInit) => {
    const token = localStorage.getItem('token');
    const url = `${baseUrl}/${resource}`;

    const res = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      credentials: 'include',
    });

    if (!res.ok) {
      if (res.status === 401) {
        // Unauthorized access
        router.push('/login'); // Redirect to the login page
        // Prevent further processing by throwing an error or returning early
        throw new Error('Unauthorized access, redirecting to login.');
      }
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error) => {
          console.error(`SWR Error: ${error.message}`);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
