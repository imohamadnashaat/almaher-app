'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { Person, PersonHistory } from '../../../../lib/types';
import Loading from '../../../../../components/Loading';

export default function PersonView() {
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Person>(`persons/${id}`);
  const { data: historyData, error: historyError } = useSWR<PersonHistory>(
    `persons/history/${id}/`
  );

  if (!data || !historyData) return <Loading />;

  return (
    <>
      <article className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">بيانات الشخص</h1>
        <section className="bg-white shadow-md rounded-lg p-6 mb-6">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-row">
              <dt className="text-gray-700">رقم: </dt>
              <dd className="font-semibold ml-2">{data.person_id}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">نوع: </dt>
              <dd className="font-semibold ml-2">{data.type_id}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">الاسم الأول: </dt>
              <dd className="font-semibold ml-2">{data.first_name}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">اسم الأب: </dt>
              <dd className="font-semibold ml-2">{data.father_name}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">الاسم الأخير: </dt>
              <dd className="font-semibold ml-2">{data.last_name}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">رقم المنزل: </dt>
              <dd className="font-semibold ml-2">{data.home_number}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">رقم الهاتف: </dt>
              <dd className="font-semibold ml-2">{data.phone_number}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">المهنة: </dt>
              <dd className="font-semibold ml-2">{data.job}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">العنوان: </dt>
              <dd className="font-semibold ml-2">{data.address}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">تاريخ الميلاد: </dt>
              <dd className="font-semibold ml-2">{data.bdate}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">أولوية: </dt>
              <dd className="font-semibold ml-2">{data.priority_id}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">الحالة: </dt>
              <dd className="font-semibold ml-2">
                {data.status ? 'نشط' : 'غير نشط'}
              </dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">مستوى: </dt>
              <dd className="font-semibold ml-2">{data.level_id}</dd>
            </div>
            <div className="flex flex-row">
              <dt className="text-gray-700">تاريخ الإنشاء: </dt>
              <dd className="font-semibold ml-2">{data.create_date}</dd>
            </div>
          </dl>
        </section>
      </article>

      {historyData && (
        <article className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-center">السجل الشخصي</h1>
          <section className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">مدرس</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">رقم الدورة</th>
                  <th className="py-2 px-4 border-b">المستوى</th>
                  <th className="py-2 px-4 border-b">رقم الجلسة</th>
                </tr>
              </thead>
              <tbody>
                {historyData.teachers.map((teacher, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{teacher.course_id}</td>
                    <td className="py-2 px-4 border-b">{teacher.level_name}</td>
                    <td className="py-2 px-4 border-b">
                      {teacher.session_number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">طالب</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">رقم الدورة</th>
                  <th className="py-2 px-4 border-b">المستوى</th>
                  <th className="py-2 px-4 border-b">رقم الجلسة</th>
                  <th className="py-2 px-4 border-b">المدرس</th>
                  <th className="py-2 px-4 border-b">الحضور</th>
                  <th className="py-2 px-4 border-b">العلامة النظرية</th>
                  <th className="py-2 px-4 border-b">العلامة العملية</th>
                  <th className="py-2 px-4 border-b">النتيجة</th>
                  <th className="py-2 px-4 border-b">نوع النتيجة</th>
                </tr>
              </thead>
              <tbody>
                {historyData.students.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{student.course_id}</td>
                    <td className="py-2 px-4 border-b">{student.level_name}</td>
                    <td className="py-2 px-4 border-b">
                      {student.session_number}
                    </td>
                    <td className="py-2 px-4 border-b">{student.teacher_id}</td>
                    <td className="py-2 px-4 border-b">{student.attendance}</td>
                    <td className="py-2 px-4 border-b">
                      {student.theoretical_mark}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {student.practical_mark}
                    </td>
                    <td className="py-2 px-4 border-b">{student.result}</td>
                    <td className="py-2 px-4 border-b">
                      {student.result_type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </article>
      )}
    </>
  );
}
