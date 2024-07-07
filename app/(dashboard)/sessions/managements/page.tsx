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
        className="input input-bordered rounded-lg w-full max-w-xs me-2"
        aria-label="Session Number"
      />

      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" // Disabled styles
        onClick={handleClick}
        disabled={!sessionNumber || isValidating} // Disable when input is empty or fetching
      >
        {isValidating ? 'عرض' : 'عرض'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
