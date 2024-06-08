'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  const fetcher = async (resource: string, init: RequestInit) => {
    const res = await fetch(resource, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
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
