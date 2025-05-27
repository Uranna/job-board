import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { createUser, findUserById, generateJWT } from '@/shared/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // Обработка ошибок от Яндекса
  if (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?error=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/login?error=no_code', request.url)
    );
  }

  try {
    // 1. Получаем access_token от Яндекса
    const redirectUri = new URL(process.env.YANDEX_REDIRECT_URI!, request.url).href;
    const { data: tokenData } = await axios.post(
      'https://oauth.yandex.ru/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: process.env.YANDEX_CLIENT_ID!,
        client_secret: process.env.YANDEX_CLIENT_SECRET!,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { access_token } = tokenData;

    // 2. Получаем данные пользователя от Яндекса
    const { data: userData } = await axios.get('https://login.yandex.ru/info', {
      headers: { Authorization: `OAuth ${access_token}` }
    });

    // 3. Ищем или создаем пользователя в локальном хранилище
    let user = findUserById(userData.id);

    if (!user) {
      user = createUser({
        email: userData.default_email,
        name: userData.real_name || userData.display_name || userData.login,
        avatarUrl: userData.default_avatar_id 
          ? `https://avatars.yandex.net/get-yapic/${userData.default_avatar_id}/islands-200`
          : undefined,
        phone: userData.default_phone?.number,
        birthday: userData.birthday,
      });
    }

    // 4. Генерируем JWT
    const jwtToken = await generateJWT(user.id);

    // 5. Сохраняем токен в куки
    const cookiesStore = await cookies();

    cookiesStore.set('token', jwtToken, {
      httpOnly: true,
      maxAge: 60 * 60,
    });

    // 6. Перенаправляем на главную
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Yandex OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=oauth_failed', request.url)
    );
  }
}