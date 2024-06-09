import React from 'react';
import Link from 'next/link';
import Logout from './Logout';

const SidebarLinks = () => {
  return (
    <nav className="mt-4">
      <Link
        href="/"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        لوحة التحكم
      </Link>
      <Link
        href="/persons"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الأشخاص
      </Link>
      <Link
        href="/students"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الطلاب
      </Link>
      <Link
        href="/teachers"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        المدرسين
      </Link>
      <Link
        href="/courses"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الدورات
      </Link>
      <div className="my-10 flex justify-center">
        <Logout />
      </div>
    </nav>
  );
};

export default SidebarLinks;
