'use client';

import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();
  return (
    <button
      className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      onClick={() => {
        localStorage.removeItem('token');
        router.push('/login');
      }}
    >
      تسجيل الخروج
    </button>
  );
}
