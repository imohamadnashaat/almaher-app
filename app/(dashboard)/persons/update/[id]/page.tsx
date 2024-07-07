'use client';

import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { useState } from 'react';
import { Person } from '../../../../../lib/types';

export default function PersonUpdate() {
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Person>(`persons/${id}`);
  const [formData, setFormData] = useState<Person | null>(null);

  if (error) return <div className="text-red-500 p-4">Failed to load</div>;
  if (!data) return <div className="text-gray-500 p-4">Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit formData to the server
  };

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        تحديث بيانات الشخص
      </h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSubmit}>
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
              <input
                type="text"
                name="first_name"
                defaultValue={data.first_name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">اسم الأب:</dt>
              <input
                type="text"
                name="father_name"
                defaultValue={data.father_name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">الاسم الأخير:</dt>
              <input
                type="text"
                name="last_name"
                defaultValue={data.last_name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">رقم المنزل:</dt>
              <input
                type="text"
                name="home_number"
                defaultValue={data.home_number}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">رقم الهاتف:</dt>
              <input
                type="text"
                name="phone_number"
                defaultValue={data.phone_number}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">المهنة:</dt>
              <input
                type="text"
                name="job"
                defaultValue={data.job}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">العنوان:</dt>
              <input
                type="text"
                name="address"
                defaultValue={data.address}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">تاريخ الميلاد:</dt>
              <input
                type="text"
                name="bdate"
                defaultValue={data.bdate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">أولوية:</dt>
              <input
                type="text"
                name="priority_id"
                defaultValue={data.priority_id}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">الحالة:</dt>
              <dd>{data.status ? 'نشط' : 'غير نشط'}</dd>
            </div>
            <div>
              <dt className="font-semibold">مستوى:</dt>
              <input
                type="text"
                name="level_id"
                defaultValue={data.level_id}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">تاريخ الإنشاء:</dt>
              <dd>{data.create_date}</dd>
            </div>
          </dl>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              تحديث البيانات
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}
