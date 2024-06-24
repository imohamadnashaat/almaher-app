'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarLayout from '../../components/SidebarLayout';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const selectedCourseId = localStorage.getItem('selectedCourseId');
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
      if (!selectedCourseId) {
        router.push('/courses/select-course');
      }
    }
  }, [router]);

  return (
    <>
      <SidebarLayout>
        {!isLoading ? (
          children
        ) : (
          <div className="h-full text-4xl font-bold text-center py-12 animate-pulse">
            الماهر
          </div>
        )}
      </SidebarLayout>
    </>
  );
}
