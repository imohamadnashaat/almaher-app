'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { Session, SessionStudent } from '../../../../lib/types';

export default function SessionView() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const pathName = usePathname();
  const id = pathName.split('/').pop();

  // Fetch session data
  const { data: sessionData, error: sessionError } = useSWR<Session>(
    `sessions/${id}`
  );
  // Fetch students data for the session
  const { data: studentsData, error: studentsError } = useSWR<SessionStudent[]>(
    `sessions/students/?course_id=${selectedCourseId}&session_id=${id}`
  );

  if (sessionError || studentsError)
    return <div className="text-red-500">Failed to load</div>;
  if (!sessionData || !studentsData)
    return <div className="text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Session</h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>ID:</strong> {sessionData.session_id}
          </p>
          <p>
            <strong>Session Number:</strong> {sessionData.session_number}
          </p>
          <p>
            <strong>Teacher:</strong> {sessionData.teacher_full_name}
          </p>
        </div>
        <div>
          <p>
            <strong>Course:</strong> {sessionData.course_id}
          </p>
          <p>
            <strong>Level:</strong> {sessionData.level_id}
          </p>
          <p>
            <strong>Position:</strong> {sessionData.position_id}
          </p>
          <p>
            <strong>Time:</strong> {sessionData.time_id}
          </p>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Students</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {studentsData.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="px-4 py-2">{student.id}</td>
              <td className="px-4 py-2">{student.student_full_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
