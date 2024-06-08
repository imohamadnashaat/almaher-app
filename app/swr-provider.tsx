'use client';

import React from 'react';
import { SWRConfig } from 'swr';

interface SWRProviderProps {
  children: React.ReactNode;
}

export const SWRProvider = ({ children }: SWRProviderProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          init.headers = {
            ...init.headers,
            'Content-Type': 'application/json',
          };
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error('An error occurred while fetching the data.');
          }
          return res.json();
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
