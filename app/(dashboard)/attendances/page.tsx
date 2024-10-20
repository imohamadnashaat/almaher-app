'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadButton from '../../../components/DownloadButton';
import { postRequest } from '../../lib/api';
import toast from 'react-hot-toast';

export default function AttendanceSelect() {
  const router = useRouter();
  const [attendanceType, setAttendanceType] = useState('teachers');
  const [error, setError] = useState<string | null>(null);

  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const handleAttendanceType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAttendanceType(event.target.value);
    setError(null); // Clear previous errors when input changes
  };

  const handleClick = async () => {
    if (!attendanceType) {
      setError('يرجى إدخال الحضور');
      return;
    }

    router.push(`/attendances/${attendanceType}`);
  };

  const handleGenerateAttendance = async () => {
    try {
      const result = await postRequest(
        `attendances/generate/?course_id=${selectedCourseId}`
      );
      toast.success(`${result.message}`, {
        duration: 4000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error while generating attendance', {
        duration: 4000,
      });
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
        onClick={handleGenerateAttendance}
      >
        انشاء الحضور
      </button>

      <DownloadButton
        endpoint="attendances/export/excel/attendance"
        filename="attendance.xls"
        params={{ course_id: selectedCourseId }}
        label="استخراج بيانات الحضور excel"
      />

      <DownloadButton
        endpoint="attendances/export/pdf/students"
        filename="attendance_students.pdf"
        params={{ course_id: selectedCourseId }}
        label="استخراج حضور الطلاب pdf"
      />

      <DownloadButton
        endpoint="attendances/export/pdf/teachers"
        filename="attendance_teachers.pdf"
        params={{ course_id: selectedCourseId }}
        label="استخراج حضور المدرسين pdf"
      />

      <h1 className="text-2xl font-bold mb-4">اختر الحضور</h1>
      <select
        value={attendanceType}
        onChange={handleAttendanceType} // Corrected from onSelect to onChange
        className="input input-bordered rounded-lg w-full max-w-xs me-2"
        aria-label="Session Number"
      >
        <option value="teachers">المدرسين</option>
        <option value="students">الطلاب</option>
      </select>

      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleClick}
        disabled={!attendanceType}
      >
        اختيار
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}
