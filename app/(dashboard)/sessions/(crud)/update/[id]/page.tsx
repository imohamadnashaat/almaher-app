'use client';

import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { Session } from '../../../../../lib/types';
import { putRequest } from '../../../../../lib/api';
import Loading from '../../../../../../components/Loading';

export default function Update() {
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Session>(`sessions/${id}`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Session>({
    defaultValues: data || {},
  });

  // if (error) return<div className="text-red-500 p-4">Failed to load</div>;
  if (!data) return <Loading />;

  const onSubmit = async (formData: Session) => {
    try {
      const result = await putRequest(`sessions/update/${id}/`, formData);
      reset(result);
      toast.success('Data updated successfully', {
        duration: 4000,
      });
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
        تحديث بيانات الجلسة
      </h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">رقم الجلسة:</dt>
              <input
                type="text"
                defaultValue={data.session_number}
                className="border p-2 rounded w-full bg-gray-200"
                disabled
              />
            </div>

            <div>
              <dt className="font-semibold">اسم المدرس:</dt>
              <input
                type="text"
                defaultValue={data.teacher_full_name}
                className="border p-2 rounded w-full bg-gray-200"
                disabled
              />
            </div>

            {/* <div>
              <dt className="font-semibold">رقم المدرس:</dt>
              <input
                type="text"
                {...register('teacher_id', { required: true })}
                defaultValue={data.teacher_id}
                className="border p-2 rounded w-full"
              />
              {errors.teacher_id && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div> */}

            <div>
              <dt className="font-semibold">مستوى:</dt>
              <select
                {...register('level_id', { required: true })}
                defaultValue={data.level_id}
                className="border p-2 rounded w-full text-center"
              >
                <option value="مبتدئ أ">مبتدئ أ</option>
                <option value="مبتدئ ب">مبتدئ ب</option>
                <option value="متوسط أ">متوسط أ</option>
                <option value="متوسط ب">متوسط ب</option>
                <option value="متقدم أ">متقدم أ</option>
                <option value="متقدم ب">متقدم ب</option>
              </select>
              {errors.level_id && (
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
