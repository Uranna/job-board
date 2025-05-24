import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get('yandex_refresh')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Refresh token not found' },
      { status: 401 }
    );
  }

  try {
    // 1. Обновляем токены через Яндекс
    const { data: { access_token, expires_in } } = await axios.post(
      'https://oauth.yandex.ru/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: process.env.YANDEX_CLIENT_ID!,
        client_secret: process.env.YANDEX_CLIENT_SECRET!
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    // 2. Обновляем куки
    cookiesStore.set('yandex_access', access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Refresh failed:', error);
    return NextResponse.json(
      { error: 'Failed to refresh tokens' },
      { status: 401 }
    );
  }
}