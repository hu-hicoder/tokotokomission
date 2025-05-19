// src/app/api/places/route.ts

export async function POST(request: Request) {
  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return new Response(JSON.stringify({ error: '緯度経度が不足しています' }), { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'APIキーが設定されていません' }), { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Google Places APIリクエスト失敗' }), { status: response.status });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました' }), { status: 500 });
  }
}

