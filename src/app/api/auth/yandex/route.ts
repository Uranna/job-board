import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const redirectUri = new URL(process.env.YANDEX_REDIRECT_URI!, request.url).href;
  const authUrl = new URL('https://oauth.yandex.ru/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', process.env.YANDEX_CLIENT_ID!);
  authUrl.searchParams.set('redirect_uri', redirectUri);

  return NextResponse.redirect(authUrl.toString());
}