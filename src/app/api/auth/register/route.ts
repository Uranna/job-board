import { NextResponse } from 'next/server';
import { createUser, findUserByEmail, generateJWT } from '@/shared/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
const { email, password, name } = await request.json();

  // Проверка существующего пользователя
  if (findUserByEmail(email)) {
    return NextResponse.json(
      { error: 'Пользователь с таким email уже существует.' },
      { status: 400 }
    );
  }

  // Создание пользователя
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = createUser({
    email,
    name,
    password: hashedPassword,
  });

  // Генерация JWT
  const token = await generateJWT(user.id);

  // Установка куки
  const response = NextResponse.json({ user: { id: user.id, email: user.email } });
  response.cookies.set('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 // 1 час
  });

  return response;
}