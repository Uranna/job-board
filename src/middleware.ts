import { jwtVerify, SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const publicRoutes = ['/login', '/register'];

  // Пропускаем статические файлы и API-роуты
  if (
    pathname.startsWith('/_next/') || // Статические файлы Next.js
    pathname.startsWith('/api/') ||   // API роуты
    pathname.startsWith('/favicon.ico') // Фавиконка
  ) {
    return NextResponse.next();
  }

  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    if (payload) {
      const response = NextResponse.next();

      const exp = payload.exp as number;
      const now = Math.floor(Date.now() / 1000);
      if (exp - now < 15 * 60) {
        const newToken = await new SignJWT({ userId: payload.userId })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1h')
          .sign(secret);

        response.cookies.set('token', newToken, {
          httpOnly: true,
          maxAge: 60 * 60
        });
      }

      if (publicRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }

    throw new Error();
  } catch {
    request.cookies.delete('token');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}