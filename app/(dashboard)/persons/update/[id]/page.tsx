'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';
import { Person } from '../../../../lib/types';
import { putRequest } from '../../../../lib/api';
import Loading from '../../../../../components/Loading';

export default function PersonUpdate() {
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Person>(`persons/${id}`);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Person>({
    defaultValues: data || {},
  });

  // if (error) return<div className="text-red-500 p-4">Failed to load</div>;
  if (!data) return <Loading />;

  const onSubmit = async (formData: Person) => {
    try {
      const result = await putRequest(`persons/update/${id}/`, formData);
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
        تحديث بيانات الشخص
      </h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">نوع:</dt>
              <select
                {...register('type_id', { required: true })}
                defaultValue={data.type_id}
                className="border p-2 rounded w-full text-center bg-gray-200"
                disabled
              >
                <option value="Student">طالب</option>
                <option value="Teacher">مدرس</option>
                <option value="Graduate">خريج</option>
              </select>
              {errors.type_id && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
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
            <div>
              <dt className="font-semibold">الاسم الأول:</dt>
              <input
                type="text"
                {...register('first_name', { required: true })}
                defaultValue={data.first_name}
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
                {...register('father_name', { required: true })}
                defaultValue={data.father_name}
                className="border p-2 rounded w-full"
              />
              {errors.father_name && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">الاسم الأخير:</dt>
              <input
                type="text"
                {...register('last_name', { required: true })}
                defaultValue={data.last_name}
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
                {...register('home_number', { required: true })}
                defaultValue={data.home_number}
                className="border p-2 rounded w-full"
              />
              {errors.home_number && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">رقم الهاتف:</dt>
              <input
                type="text"
                {...register('phone_number', { required: true })}
                defaultValue={data.phone_number}
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
                {...register('job', { required: true })}
                defaultValue={data.job}
                className="border p-2 rounded w-full"
              />
              {errors.job && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">العنوان:</dt>
              <input
                type="text"
                {...register('address', { required: true })}
                defaultValue={data.address}
                className="border p-2 rounded w-full"
              />
              {errors.address && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">تاريخ الميلاد:</dt>
              <input
                type="date"
                {...register('bdate', { required: true })}
                defaultValue={data.bdate}
                className="border p-2 rounded w-full"
              />
              {errors.bdate && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">أولوية:</dt>
              <select
                {...register('priority_id', { required: true })}
                defaultValue={data.priority_id}
                className="border p-2 rounded w-full text-center"
              >
                <option value="مستمر">مستمر</option>
                <option value="غير معروف">غير معروف</option>
              </select>
              {errors.priority_id && (
                <span className="text-red-500">هذا الحقل مطلوب</span>
              )}
            </div>
            <div>
              <dt className="font-semibold">الحالة:</dt>
              <dd>
                <input
                  type="checkbox"
                  defaultChecked={data.status}
                  {...register('status')}
                />
              </dd>
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
