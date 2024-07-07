'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { Person } from '../../../../lib/types';

export default function PersonView() {
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Person>(`persons/${id}`);

  if (error) return <div className="text-red-500 p-4">Failed to load</div>;
  if (!data) return <div className="text-gray-500 p-4">Loading...</div>;

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">بيانات الشخص</h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="font-semibold">رقم:</dt>
            <dd>{data.person_id}</dd>
          </div>
          <div>
            <dt className="font-semibold">نوع:</dt>
            <dd>{data.type_id}</dd>
          </div>
          <div>
            <dt className="font-semibold">الاسم الأول:</dt>
            <dd>{data.first_name}</dd>
          </div>
          <div>
            <dt className="font-semibold">اسم الأب:</dt>
            <dd>{data.father_name}</dd>
          </div>
          <div>
            <dt className="font-semibold">الاسم الأخير:</dt>
            <dd>{data.last_name}</dd>
          </div>
          <div>
            <dt className="font-semibold">رقم المنزل:</dt>
            <dd>{data.home_number}</dd>
          </div>
          <div>
            <dt className="font-semibold">رقم الهاتف:</dt>
            <dd>{data.phone_number}</dd>
          </div>
          <div>
            <dt className="font-semibold">المهنة:</dt>
            <dd>{data.job}</dd>
          </div>
          <div>
            <dt className="font-semibold">العنوان:</dt>
            <dd>{data.address}</dd>
          </div>
          <div>
            <dt className="font-semibold">تاريخ الميلاد:</dt>
            <dd>{data.bdate}</dd>
          </div>
          <div>
            <dt className="font-semibold">أولوية:</dt>
            <dd>{data.priority_id}</dd>
          </div>
          <div>
            <dt className="font-semibold">الحالة:</dt>
            <dd>{data.status ? 'نشط' : 'غير نشط'}</dd>
          </div>
          <div>
            <dt className="font-semibold">مستوى:</dt>
            <dd>{data.level_id}</dd>
          </div>
          <div>
            <dt className="font-semibold">تاريخ الإنشاء:</dt>
            <dd>{data.create_date}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
