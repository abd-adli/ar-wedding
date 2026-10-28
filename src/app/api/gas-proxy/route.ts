import { NextResponse } from 'next/server';

// Wajib biar Vercel selalu nge-run ini secara real-time dan gak nge-cache request-nya
export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Fallback URL kalau env variable di Vercel nyangkut
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwPnE5dFxVxcGIiYrtVs1COD4wAC9P0074rgjC34S35YDhTF95hVf_yEa-4xNGTHHo1/exec';

    console.log("Mencoba mengirim data ke Google Script..."); // Radarnya kita nyalain!

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(body),
      redirect: 'follow'
    });

    const resultText = await response.text();
    console.log("Respon dari Google Drive:", resultText); // Cek jawaban dari Drive

    return NextResponse.json({ status: 'success', data: resultText });

  } catch (error) {
    console.error("ERROR saat ngirim ke Drive:", error); // Tangkap basah kalau gagal
    return NextResponse.json({ status: 'error', message: String(error) }, { status: 500 });
  }
}