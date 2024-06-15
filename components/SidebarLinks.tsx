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

      {/* Start Divider */}
      <hr className="border-gray-200" />
      {/* End Divider */}

      <Link
        href="/persons"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الأشخاص
      </Link>
      <Link
        href="/persons/teachers"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        المدرسين
      </Link>
      <Link
        href="/persons/students"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الطلاب
      </Link>
      <Link
        href="/persons/graduates"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الخريجين
      </Link>
      <Link
        href="/persons/waitlist"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        قائمة انتظار الأشخاص
      </Link>

      {/* Start Divider */}
      <hr className="border-gray-200" />
      {/* End Divider */}

      <Link
        href="/sessions"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الجلسات
      </Link>
      <Link
        href="/student-sessions-management"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        ادارة جلسات الطلاب
      </Link>
      <Link
        href="/student-sessions-view"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        عرض جلسات الطلاب
      </Link>
      <Link
        href="/sessions-waitlist"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        قائمة انتظار الجلسات
      </Link>

      {/* Start Divider */}
      <hr className="border-gray-200" />
      {/* End Divider */}

      <Link
        href="/attendance"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الحضور
      </Link>
      <Link
        href="/exams"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الاختبارات
      </Link>
      <Link
        href="/results"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        النتائج
      </Link>

      {/* Start Divider */}
      <hr className="border-gray-200" />
      {/* End Divider */}

      <Link
        href="/courses"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الدورات
      </Link>
      <Link
        href="/levels"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        المستويات
      </Link>
      <Link
        href="/locations"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الأماكن
      </Link>
      <Link
        href="/periods"
        className="block px-4 py-2 mt-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
      >
        الفترات
      </Link>
      <div className="my-10 flex justify-center">
        <Logout />
      </div>
    </nav>
  );
};

export default SidebarLinks;
