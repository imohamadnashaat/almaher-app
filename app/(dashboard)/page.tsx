'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-gray-900">الصفحة الرئيسية</h1>
      <button
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => router.push('/courses/select-course')}
      >
        اختر دورة
      </button>
    </>
  );
}
