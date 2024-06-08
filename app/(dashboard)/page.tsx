'use client';

import useSWR from 'swr';
import Logout from '@/components/Logout';

export default function Home() {
  // const { data, error, isLoading } = useSWR(
  //   'https://app.almaher.one/api/auth/protected/'
  // );

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <>
      <h1>الصفحة الرئيسية</h1>
      {/* <div>hello {data.name}!</div>; */}
      <Logout />
    </>
  );
}
