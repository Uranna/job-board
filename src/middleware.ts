import { jwtVerify, SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const publicRoutes = ['/login', '/register'];

  // Пропускаем статические файлы и API-роуты
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Обработка отсутствия токена
  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    
    // Если токен валиден, но пользователь на публичном роуте - редирект на главную
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Проверка необходимости обновления токена
    const exp = payload.exp as number;
    const now = Math.floor(Date.now() / 1000);
    if (exp - now < 15 * 60) {
      const newToken = await new SignJWT({ userId: payload.userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);

      const response = NextResponse.next();
      response.cookies.set('token', newToken, {
        httpOnly: true,
        maxAge: 60 * 60,
      });
      return response;
    }

    return NextResponse.next();
  } catch {
    // Очищаем невалидный токен
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}