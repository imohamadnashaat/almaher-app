'use client';

import useSWR from 'swr';

export default function Student() {
  // const { data, error, isLoading } = useSWR(
  //   'https://app.almaher.one/api/auth/protected/'
  // );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <>
      <h1>المدرسين</h1>
      {/* <div>hello {data.name}!</div>; */}
    </>
  );
}
