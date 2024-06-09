'use client';

import useSWR from 'swr';

interface Course {
  course_id: number;
  course_name: string;
  start_date: string;
  end_date: string;
  num_of_session: number;
  create_date: string;
}

export default function Student() {
  const { data, error } = useSWR<Course[]>(
    'https://app.almaher.one/api/courses/'
  );

  if (error) return <div>Failed to load. {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // render data
  return (
    <>
      <h1>الدورات</h1>
      <div>
        <ul>
          {data.map((course) => (
            <li key={course.course_id}>
              <a href={`/courses/${course.course_id}`}>
                {course.course_id} {course.course_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
