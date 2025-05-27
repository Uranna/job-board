import { Label } from "@/shared/ui/components/label";
import { Button } from "@/shared/ui/primitives/button";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, PropsWithChildren, useState } from "react";
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});

type RegisterFormProps = PropsWithChildren;

export const RegisterForm: FC<RegisterFormProps> = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('')
        const res = await axios.post('/api/auth/register', values);
        if (res.status === 200) router.push('/');
      } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        setError(e?.response?.data?.error || 'Произошла ошибка.');
      }
    },
  })
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
          Регистрация
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Введите свои учетные данные для регистрации
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

          <Label
            label='Повторите пароль'
            error={formik.touched.confirmPassword ? formik.errors.confirmPassword : undefined}
            inputProps={{
              name: 'confirmPassword',
              type: 'password',
              placeholder: '•••••',
              value: formik.values.confirmPassword,
              onChange: formik.handleChange,
              onBlur: formik.handleBlur,
            }}
          />
        </div>

        <Button type="submit" className="w-full">
          Зарегистрироваться
        </Button>

        {error && (
          <p className="text-sm ml-3 mt-2 text-red-500">{error}</p>
        )}

      </form>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        Уже есть аккаунт?{' '}
        <Link
          href='/login'
          className="font-medium text-gray-900 hover:underline dark:text-gray-300"
        >
          Войти
        </Link>
      </div>
    </>
  );
};