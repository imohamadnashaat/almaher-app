'use client';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GenerateSessionsRequest, Period, Position } from '../../../lib/types';
import { postRequest } from '../../../lib/api';
import { useRouter } from 'next/navigation';
import { Level } from '../../levels/page';
import useSWR from 'swr';

export default function CourseAdd() {
  const router = useRouter();
  const selectedCourseId = localStorage.getItem('selectedCourseId');

  const { data: levels, error: errorLevels } = useSWR<Level[]>('levels');
  const { data: positions, error: errorPositions } =
    useSWR<Position[]>('positions');
  const { data: times, error: errorTimes } = useSWR<Period[]>('periods');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<GenerateSessionsRequest>();

  const onSubmit = async (data: GenerateSessionsRequest) => {
    try {
      const formattedData = {
        course_id: selectedCourseId,
        levels: Object.keys(data.levels)
          .map((key) => ({
            level_key: key,
            level_id: levels?.find((level) => level.level_id === Number(key))
              ?.level_name,
            position_id: data.levels[key].position_id,
            time_id: data.levels[key].time_id,
            active_students: data.levels[key].active_students,
            unknown_students: data.levels[key].unknown_students,
            num_of_session: data.levels[key].num_of_session,
          }))
          .sort((a, b) => Number(b.level_key) - Number(a.level_key)), // Sorting by level_key in descending order
      };

      const result = await postRequest('sessions/generate/', formattedData);
      toast.success('تم إنشاء الجلسات بنجاح', { duration: 4000 });
      router.push('/sessions');
      reset(); // Reset the form upon successful submission
    } catch (error) {
      console.error(error);
      setError('root', {
        message: (error as Error).message,
      });
    }
  };

  if (errorLevels || errorPositions || errorTimes) {
    return <div className="text-red-500">Error loading data!</div>;
  }

  return (
    <article className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">إنشاء الجلسات</h1>
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <dl className="grid grid-cols-1 gap-8">
            {levels
              ?.slice()
              .reverse()
              .map((level) => (
                <div key={level.level_id}>
                  <h2 className="text-xl font-bold text-center">
                    {level.level_name}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md rounded-lg p-4">
                    {/* Select position */}
                    <div>
                      <label
                        htmlFor={`levels.${level.level_id}.position_id`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        الموقع
                      </label>
                      <select
                        {...register(`levels.${level.level_id}.position_id`, {
                          required: 'الموقع مطلوب',
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-center"
                      >
                        {positions?.map((position) => (
                          <option
                            key={position.position_name}
                            value={position.position_name}
                          >
                            {position.position_name}
                          </option>
                        ))}
                      </select>
                      {errors.levels?.[level.level_id]?.position_id && (
                        <div className="text-red-600 text-sm font-medium">
                          {
                            errors.levels?.[level.level_id]?.position_id
                              ?.message
                          }
                        </div>
                      )}
                    </div>
                    {/* Select time */}
                    <div>
                      <label
                        htmlFor={`levels.${level.level_id}.time_id`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        الوقت
                      </label>
                      <select
                        {...register(`levels.${level.level_id}.time_id`, {
                          required: 'الوقت مطلوب',
                        })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-center"
                      >
                        {times?.map((time) => (
                          <option key={time.time_name} value={time.time_name}>
                            {time.time_name}
                          </option>
                        ))}
                      </select>
                      {errors.levels?.[level.level_id]?.time_id && (
                        <div className="text-red-600 text-sm font-medium">
                          {errors.levels?.[level.level_id]?.time_id?.message}
                        </div>
                      )}
                    </div>
                    {/* Number of active students */}
                    <div>
                      <label
                        htmlFor={`levels.${level.level_id}.active_students`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        عدد الطلاب &quot;المستمرين&quot;
                      </label>
                      <input
                        {...register(
                          `levels.${level.level_id}.active_students`,
                          {
                            required: 'عدد الطلاب "المستمرين" مطلوب',
                          }
                        )}
                        type="number"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-center"
                      />
                      {errors.levels?.[level.level_id]?.active_students && (
                        <div className="text-red-600 text-sm font-medium">
                          {
                            errors.levels?.[level.level_id]?.active_students
                              ?.message
                          }
                        </div>
                      )}
                    </div>
                    {/* Number of unknown students */}
                    <div>
                      <label
                        htmlFor={`levels.${level.level_id}.unknown_students`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        عدد الطلاب &quot;غير معروف&quot;
                      </label>
                      <input
                        {...register(
                          `levels.${level.level_id}.unknown_students`,
                          { required: 'عدد الطلاب "غير معروف" مطلوب' }
                        )}
                        type="number"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-center"
                      />
                      {errors.levels?.[level.level_id]?.unknown_students && (
                        <div className="text-red-600 text-sm font-medium">
                          {
                            errors.levels?.[level.level_id]?.unknown_students
                              ?.message
                          }
                        </div>
                      )}
                    </div>
                    {/* Number of sessions */}
                    <div>
                      <label
                        htmlFor={`levels.${level.level_id}.num_of_session`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        عدد الجلسات
                      </label>
                      <input
                        {...register(
                          `levels.${level.level_id}.num_of_session`,
                          {
                            required: 'عدد الجلسات مطلوب',
                          }
                        )}
                        type="number"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-center"
                      />
                      {errors.levels?.[level.level_id]?.num_of_session && (
                        <div className="text-red-600 text-sm font-medium">
                          {
                            errors.levels?.[level.level_id]?.num_of_session
                              ?.message
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </dl>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إنشاء الجلسات
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
