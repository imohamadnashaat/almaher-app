'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from './lib/api';

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider: React.FC<SWRProviderProps> = ({ children }) => {
  const router = useRouter();

  const fetcher = async (resource: string, init: RequestInit) => {
    try {
      return await fetchWithToken(resource, init);
    } catch (error: any) {
      if (error.message === 'Unauthorized access, redirecting to login.') {
        router.push('/login');
      }
      throw error;
    }
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error: Error) => {
          console.error(`SWR Error: ${error.message}`);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
