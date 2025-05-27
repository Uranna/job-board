'use client'

import { Label } from '@/shared/ui/components/label';
import { YandexAuthButton } from '@/shared/ui/components/yandexAuthButton';
import { Button } from '@/shared/ui/primitives/button';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .required('Обязательное поле'),
});

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError('');
      try {
        const res = await axios.post('/api/auth/login', values);
        if (res.status === 200) router.push('/');
      } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        setError(e?.response?.data?.error || 'Произошла ошибка.')
      }
    },
  })

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Вход в систему
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Введите свои учетные данные для входа
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} onChange={() => setError('')}>
        <div className='space-y-4 mb-8'>
          <Label
            label='Email'
            error={formik.touched.email ? formik.errors.email : undefined}
            inputProps={{
              name: 'email',
              type: 'text',
              placeholder: 'user@example.com',
              value: formik.values.email,
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
            }}
          />

          <Label
            label='Пароль'
            error={formik.touched.password ? formik.errors.password : undefined}
            inputProps={{
              name: 'password',
              type: 'password',
              placeholder: '•••••',
              value: formik.values.password,
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
            }}
          />
        </div>

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          Войти
        </Button>

        {error && (
          <p className="text-sm ml-3 mt-2 text-red-500">{error}</p>
        )}

      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Или войти через
          </span>
        </div>
      </div>

      <YandexAuthButton />

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Нет аккаунта?{' '}
        <Link
          href='/register'
          className="font-medium text-gray-900 hover:underline dark:text-gray-300"
        >
          Зарегистрироваться
        </Link>
      </div>
    </>
  );
};