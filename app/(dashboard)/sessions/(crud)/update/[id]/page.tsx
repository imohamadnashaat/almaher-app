'use client';

import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { Person, Session } from '../../../../../lib/types';
import { putRequest } from '../../../../../lib/api';
import Loading from '../../../../../../components/Loading';
import { useState, useRef, useEffect } from 'react';

export default function Update() {
  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const router = useRouter();
  const pathName = usePathname();
  const id = pathName.split('/').pop();

  const { data, error } = useSWR<Session>(`sessions/${id}/`);
  const { data: availableTeachers, error: availableTeachersError } = useSWR<
    Person[]
  >(data ? `courses/${selectedCourseId}/teachers/available/` : null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<Session>({
    defaultValues: data || {},
  });

  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!data || !availableTeachers) return <Loading />;

  const filteredTeachers = availableTeachers.filter((teacher) =>
    `${teacher.first_name} ${teacher.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const onSubmit = async (formData: Session) => {
    try {
      const result = await putRequest(`sessions/update/${id}/`, formData);
      toast.success('Data updated successfully', {
        duration: 4000,
      });
      router.push('/sessions');
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
                className="border p-2 rounded w-full bg-gray-200 text-center"
                disabled
              />
            </div>

            <div>
              <dt className="font-semibold">مستوى:</dt>
              <input
                type="text"
                defaultValue={data.level_id}
                className="border p-2 rounded w-full bg-gray-200 text-center"
                disabled
              />
            </div>

            <div>
              <dt className="font-semibold">المدرس:</dt>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="border p-2 rounded w-full text-center cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  {data.teacher_full_name || 'اختر مدرس'}
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border rounded mt-1">
                    <input
                      type="text"
                      placeholder="ابحث عن مدرس"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-b p-2 w-full"
                    />
                    <select
                      {...register('teacher_id', { required: true })}
                      defaultValue={data.teacher_full_name || ''}
                      className="border-none p-2 w-full text-center"
                      size={5}
                    >
                      {filteredTeachers.map((teacher) => (
                        <option
                          key={teacher.person_id}
                          value={teacher.person_id}
                        >
                          {teacher.first_name} {teacher.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {errors.teacher_id && (
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
