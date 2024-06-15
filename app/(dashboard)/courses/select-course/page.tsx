'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Course } from '../../../lib/types';

export default function SelectCourse() {
  const router = useRouter();
  const { data, error } = useSWR<Course[]>(
    'https://api.almaher.xyz/api/courses/'
  );
  const [selectedCourseId, setSelectedCourseId] = useState('');

  const handleSelectChange = (event: any) => {
    setSelectedCourseId(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('selectedCourseId', selectedCourseId);
    router.push('/');
  };

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>اختر الدورة التدريبية</h1>
      <select
        className="my-4"
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
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleButtonClick}
      >
        اختيار
      </button>
    </div>
  );
}
