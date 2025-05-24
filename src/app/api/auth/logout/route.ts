import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookiesStore = await cookies();
  cookiesStore.delete('token');

  return NextResponse.json({ success: true });
}