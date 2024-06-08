'use client';

import useSWR from 'swr';

export default function Student() {
  const { data, error } = useSWR('https://app.almaher.one/api/courses/');

  if (error) return <div>failed to load. {error.message}</div>;
  if (!data) return <div>loading...</div>;

  // render data
  return (
    <>
      <h1>الدورات</h1>
      <div>{data[0].courses_name}</div>
    </>
  );
}
