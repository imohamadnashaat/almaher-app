'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionsManagement() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');

  const handleSessionIdChange = (event: any) => {
    setSessionId(event.target.value);
  };

  const handleClick = () => {
    const id = parseInt(sessionId, 10);
    if (!isNaN(id)) {
      router.push(`/sessions/${id}`);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">إدارة الجلسات</h1>
      <input
        type="number"
        value={sessionId}
        onChange={handleSessionIdChange}
        placeholder="رقم الجلسة.."
        className="input input-bordered w-full max-w-xs"
        aria-label="Session Number"
      />
      <button
        className="mt-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleClick}
      >
        عرض
      </button>
    </>
  );
}
