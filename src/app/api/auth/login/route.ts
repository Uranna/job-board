import { NextResponse } from 'next/server';
import { findUserByEmail, generateJWT } from '@/shared/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const user = findUserByEmail(email);

  if (!user || !user.password) {
    return NextResponse.json(
      { error: 'Неверно введен email или пароль.' },
      { status: 401 }
    );
  }

  // Проверка пароля
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json(
      { error: 'Неверно введен email или пароль.' },
      { status: 401 }
    );
  }

  // Генерация JWT
  const token = await generateJWT(user.id);

  const { password: _, ...data } = user;

  // Установка куки
  const response = NextResponse.json({ user: data });
  response.cookies.set('token', token, {
    httpOnly: true,
    maxAge: 60 * 60
  });

  return response;
}