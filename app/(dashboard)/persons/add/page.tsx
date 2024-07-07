'use client';

import { useForm } from 'react-hook-form';
import { Person } from '../../../lib/types';

export default function PersonAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Person>();

  const onSubmit = (data: Person) => {
    // Submit data to the server
    console.log(data);
  };

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">إضافة شخص جديد</h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">نوع:</dt>
              <input
                type="text"
                {...register('type_id', { required: true })}
                className="border p-2 rounded w-full"
              />
              {errors.type_id && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">الاسم الأول:</dt>
              <input
                type="text"
                {...register('first_name', { required: true })}
                className="border p-2 rounded w-full"
              />
              {errors.first_name && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">اسم الأب:</dt>
              <input
                type="text"
                {...register('father_name')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">الاسم الأخير:</dt>
              <input
                type="text"
                {...register('last_name', { required: true })}
                className="border p-2 rounded w-full"
              />
              {errors.last_name && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">رقم المنزل:</dt>
              <input
                type="text"
                {...register('home_number')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">رقم الهاتف:</dt>
              <input
                type="text"
                {...register('phone_number', { required: true })}
                className="border p-2 rounded w-full"
              />
              {errors.phone_number && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">المهنة:</dt>
              <input
                type="text"
                {...register('job')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">العنوان:</dt>
              <input
                type="text"
                {...register('address')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">تاريخ الميلاد:</dt>
              <input
                type="text"
                {...register('bdate')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">أولوية:</dt>
              <input
                type="text"
                {...register('priority_id')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">الحالة:</dt>
              <input
                type="checkbox"
                {...register('status')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">مستوى:</dt>
              <input
                type="text"
                {...register('level_id')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <dt className="font-semibold">تاريخ الإنشاء:</dt>
              <input
                type="text"
                {...register('create_date')}
                className="border p-2 rounded w-full"
              />
            </div>
          </dl>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة شخص
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}
