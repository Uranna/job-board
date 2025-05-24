import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeJWT, findUserById } from '@/shared/lib/auth';

export async function GET() {
  const cookiesStore =  await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Запрос без авторизации' },
      { status: 401 }
    );
  }

  try {
    const info = await decodeJWT(token);
    if (info?.userId) {
      const user = findUserById(info.userId);
      if (user) {
        const { password: _, ...data } = user;
        return NextResponse.json(
          { user: data },
          { status: 200 }
        );
      }
    }

    throw new Error();
  } catch {
    return NextResponse.json(
      { error: 'Пользователь не найден' },
      { status: 401 }
    );
  }
}