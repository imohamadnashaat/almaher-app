'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Course } from '../../../../lib/types';
import { putRequest } from '../../../../lib/api';
import Loading from '../../../../../components/Loading';

export default function CourseUpdate() {
  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Course>(`courses/${id}`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Course>({
    defaultValues: data || {},
  });

  if (!data) return <Loading />;

  const onSubmit = async (formData: Course) => {
    try {
      const result = await putRequest(`courses/update/${id}/`, formData);
      toast.success('Data updated successfully', {
        duration: 4000,
      });
      router.push('/courses');
    } catch (error) {
      console.error(error);
      setError('root', {
        message: `${error}`,
      });
    }
  };

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        تحديث بيانات الدورة
      </h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">اسم الدورة:</dt>
              <input
                type="text"
                {...register('course_name', { required: true })}
                defaultValue={data.course_name}
                className="border p-2 rounded w-full"
              />
              {errors.course_name && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">تاريخ البدء:</dt>
              <input
                type="date"
                {...register('start_date', { required: true })}
                defaultValue={data.start_date}
                className="border p-2 rounded w-full"
              />
              {errors.start_date && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">تاريخ الانتهاء:</dt>
              <input
                type="date"
                {...register('end_date', { required: true })}
                defaultValue={data.end_date}
                className="border p-2 rounded w-full"
              />
              {errors.end_date && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">عدد الجلسات:</dt>
              <input
                type="number"
                {...register('num_of_session', { required: true })}
                defaultValue={data.num_of_session}
                className="border p-2 rounded w-full"
              />
              {errors.num_of_session && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
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

          {errors.root && (
            <div className="text-red-600 text-sm font-medium">
              {errors.root.message}
            </div>
          )}
        </form>
      </section>
    </article>
  );
}
