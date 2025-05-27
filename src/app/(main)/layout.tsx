'use client'

import { PropsWithChildren, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userAtom } from '@/shared/store/userInfo';
import { Header } from '@/widgets/Header';
import { redirect } from 'next/navigation';
import { filtersAtom, initialFiltersAtom } from '@/shared/store/filters';

export default function RootLayout({ children }: PropsWithChildren) {
  const [_, setUser] = useAtom(userAtom);
  const [__, setFilters] = useAtom(filtersAtom);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get('/api/auth/me');
        if (!data.user.id) {
          throw new Error()
        }
        setUser(data.user)
      } catch {
        console.error('Нет данных по пользователю');
        await axios.get('/api/auth/logout');
        redirect('/login');
      }

    })();
  }, [setUser]);

  useEffect(() => {
    setFilters(initialFiltersAtom)
  }, [setFilters]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}