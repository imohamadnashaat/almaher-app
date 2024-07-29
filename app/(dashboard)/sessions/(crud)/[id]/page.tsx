'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import {
  Session,
  SessionAvailableStudent,
  SessionStudentDetails,
} from '../../../../lib/types';
import Loading from '../../../../../components/Loading';

export default function SessionView() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const pathName = usePathname();
  const id = pathName.split('/').pop();

  // Fetch session data
  const { data: sessionData, error: sessionError } = useSWR<Session>(
    `sessions/${id}`
  );
  // Fetch students data for the session
  const { data: studentsData, error: studentsError } = useSWR<
    SessionStudentDetails[]
  >(
    `sessions/students/details/?course_id=${selectedCourseId}&session_id=${id}`
  );
  // Fetch students wait list
  const { data: availableStudentsData, error: waitListError } = useSWR<
    SessionAvailableStudent[]
  >(`sessions/students/available/?course_id=${selectedCourseId}`);

  if (sessionError || studentsError || waitListError)
    return <div className="text-red-500">Failed to load</div>;
  if (!sessionData || !studentsData || !availableStudentsData)
    return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8">بيانات الجلسة</h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>رقم المدرس:</strong> {sessionData.session_id}
          </p>
          <p>
            <strong>رقم الجلسة:</strong> {sessionData.session_number}
          </p>
          <p>
            <strong>المدرس:</strong> {sessionData.teacher_full_name}
          </p>
        </div>
        <div>
          <p>
            <strong>الدورة:</strong> {sessionData.course_id}
          </p>
          <p>
            <strong>المستوى:</strong> {sessionData.level_id}
          </p>
          <p>
            <strong>المكان:</strong> {sessionData.position_id}
          </p>
          <p>
            <strong>الوقت:</strong> {sessionData.time_id}
          </p>
        </div>
      </div>

      {/* Session students table */}
      <h2 className="text-xl font-semibold my-4">الطلاب</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-start">ID</th>
            <th className="px-4 py-2 text-start">الاسم</th>
            <th className="px-4 py-2 text-start">اسم الاب</th>
            <th className="px-4 py-2 text-start">تاريم الميلاد</th>
            <th className="px-4 py-2 text-start">الأولوية</th>
            <th className="px-4 py-2 text-start">المستوى</th>
            <th className="px-4 py-2 text-start">ازالة</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {studentsData.map((student) => (
            <tr key={student.id} className="border-b">
              <td className="px-4 py-2">{student.id}</td>
              <td className="px-4 py-2">{student.student_full_name}</td>
              <td className="px-4 py-2">{student.student_data.father_name}</td>
              <td className="px-4 py-2">{student.student_data.bdate}</td>
              <td className="px-4 py-2">{student.student_data.priority_id}</td>
              <td className="px-4 py-2">{student.student_data.level_id}</td>
              <td className="px-4 py-2">
                <button>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Student wait list table */}
      <h2 className="text-xl font-semibold my-4">قائمة الانتظار</h2>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-start">ID</th>
            <th className="px-4 py-2 text-start">الاسم</th>
            <th className="px-4 py-2 text-start">اسم الاب</th>
            <th className="px-4 py-2 text-start">تاريم الميلاد</th>
            <th className="px-4 py-2 text-start">الأولوية</th>
            <th className="px-4 py-2 text-start">المستوى</th>
            <th className="px-4 py-2 text-start">اضافة</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {availableStudentsData.map((student) => (
            <tr key={student.person_id} className="border-b">
              <td className="px-4 py-2">{student.person_id}</td>
              <td className="px-4 py-2">
                {student.first_name} {student.last_name}
              </td>
              <td className="px-4 py-2">{'father_name'}</td>
              <td className="px-4 py-2">{student.bdate}</td>
              <td className="px-4 py-2">{'priority_id'}</td>
              <td className="px-4 py-2">{student.level_id_id}</td>
              <td className="px-4 py-2 text-start">
                <button className="w-6 bg-green-500 rounded-2xl">➕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
