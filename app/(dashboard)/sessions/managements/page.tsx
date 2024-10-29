'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Session } from '../../../lib/types';
import Loading from '../../../../components/Loading';

interface SessionsManagementProps {
  params: { showArrow: boolean; sessionId: number; sessionNo: number };
}

export default function SessionsManagement({
  params: { showArrow = false, sessionId, sessionNo },
}: SessionsManagementProps) {
  const router = useRouter();
  const [targetSession, setTargetSession] = useState('');
  const [error, setError] = useState<string | null>(null);

  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const {
    data: sessionData,
    error: sessionError,
    isValidating,
  } = useSWR<Session>(
    targetSession
      ? `sessions/number/?course_id=${selectedCourseId}&session_number=${targetSession}`
      : null
  );
  // Fetch sessions count
  const { data: sessionsCount } = useSWR<{ count: number }>(
    `courses/${selectedCourseId}/sessions/count/`
  );

  const handleSessionIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetSession(event.target.value);
    setError(null);
  };

  const handleClick = async () => {
    if (!targetSession) {
      setError('يرجى إدخال رقم الجلسة');
      return;
    }

    const sessionNumber = Number(targetSession);
    if (
      sessionNumber < 1 ||
      (sessionsCount?.count !== undefined &&
        sessionNumber > sessionsCount.count)
    ) {
      setError(`رقم الجلسة خارج النطاق (1 - ${sessionsCount?.count})`);
      return;
    }

    if (sessionError) {
      return setError(`رقم الجلسة خارج النطاق (1 - ${sessionsCount?.count})`);
    }

    router.push(`/sessions/${sessionData?.session_id}`);
  };

  const handleArrowClick = async (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      router.push(`/sessions/${sessionId + 1}`);
    } else {
      router.push(`/sessions/${sessionId - 1}`);
    }
  };

  if (!sessionsCount) return <Loading />;

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">إدارة الجلسات</h1>

        {showArrow && sessionNo > 1 && (
          <button
            className="mx-4 text-4xl"
            onClick={() => handleArrowClick('previous')}
          >
            &#8594;
          </button>
        )}

        <input
          type="number"
          min={1}
          max={sessionsCount?.count}
          onChange={handleSessionIdChange}
          placeholder="رقم الجلسة.."
          className="input input-bordered rounded-lg w-full max-w-xs me-2"
          aria-label="Session Number"
        />

        <button
          className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" // Disabled styles
          onClick={handleClick}
        >
          {'عرض'}
        </button>

        {showArrow && sessionNo < sessionsCount?.count && (
          <button
            className="mx-4 text-4xl"
            onClick={() => handleArrowClick('next')}
          >
            &#8592;
          </button>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </>
  );
}
