'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Course } from '../../../lib/types';
import Loading from '../../../../components/Loading';
import { useSidebarStatus } from '../../../course';

export default function SelectCourse() {
  const router = useRouter();
  const { data, error } = useSWR<Course[]>('courses/');
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return (
      localStorage.getItem('selectedCourseId') ||
      data?.[0]?.course_id?.toString() ||
      '1'
    );
  });
  const { changeName } = useSidebarStatus();

  const handleSelectChange = (event: any) => {
    setSelectedCourseId(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('selectedCourseId', selectedCourseId);
    const courseName =
      data?.find((course) => course.course_id === +selectedCourseId)
        ?.course_name || '';

    localStorage.setItem('selectedCourseName', courseName);
    changeName(courseName);
    router.push('/');
  };

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <Loading />;

  return (
    <div>
      <h1>اختر الدورة التدريبية</h1>
      <select
        className="my-4 me-2 rounded-lg"
        onChange={handleSelectChange}
        value={selectedCourseId}
      >
        {data.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name}
          </option>
        ))}
      </select>

      <button
        className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={handleButtonClick}
      >
        اختيار
      </button>
    </div>
  );
}
