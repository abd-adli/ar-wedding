import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GAS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwPnE5dFxVxcGIiYrtVs1COD4wAC9P0074rgjC34S35YDhTF95hVf_yEa-4xNGTHHo1/exec';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const res = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'proxy error' },
      { status: 500 },
    );
  }
}
