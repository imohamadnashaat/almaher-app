'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { login } from './endpoints';

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const resetSetError = () => setError('root', { message: '' });

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            تسجيل الدخول
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(async (data) => {
              try {
                const response = await login(data);
                localStorage.setItem('token', response.token);
                router.push('/');
              } catch (error) {
                setError('root', {
                  message: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
                });
              }
            })}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                اسم المستخدم
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  type="text"
                  {...register('username', { required: true })}
                  onChange={resetSetError}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  كلمة المرور
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: true })}
                  onChange={resetSetError}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {errors.root && (
              <div className="text-red-600 text-sm font-medium">
                {errors.root.message}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
