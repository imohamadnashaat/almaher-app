'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Session } from '../../../lib/types';

export default function SessionsManagement() {
  const router = useRouter();
  const [sessionNumber, setSessionNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const {
    data: sessionData,
    error: sessionError,
    isValidating,
  } = useSWR<Session>(
    sessionNumber
      ? `sessions/number/?course_id=${selectedCourseId}&session_number=${sessionNumber}`
      : null
  );

  const handleSessionIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionNumber(event.target.value);
    setError(null); // Clear previous errors when input changes
  };

  const handleClick = async () => {
    if (!sessionNumber) {
      setError('يرجى إدخال رقم الجلسة');
      return;
    }

    if (sessionError) {
      setError('لم يتم العثور على جلسة بهذا الرقم');
      return;
    }

    router.push(`/sessions/${sessionData?.session_id}`);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">إدارة الجلسات</h1>
      <input
        type="number"
        value={sessionNumber}
        onChange={handleSessionIdChange}
        placeholder="رقم الجلسة.."
        className="input input-bordered w-full max-w-xs"
        aria-label="Session Number"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className="mt-4 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed" // Disabled styles
        onClick={handleClick}
        disabled={!sessionNumber || isValidating} // Disable when input is empty or fetching
      >
        {isValidating ? 'جار التحميل...' : 'عرض'}
      </button>
    </>
  );
}
