'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarLayout from '../../components/SidebarLayout';
import Loading from '../../components/Loading';

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
      <SidebarLayout>{!isLoading ? children : <Loading />}</SidebarLayout>
    </>
  );
}
