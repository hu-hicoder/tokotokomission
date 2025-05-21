export async function POST(request: Request) {
  try {
    const { lat, lng } = await request.json();

    console.log('APIで受け取った座標:', lat, lng);

    if (!lat || !lng) {
      console.error('緯度経度が不足しています');
      return new Response(JSON.stringify({ error: '緯度経度が不足しています' }), { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('APIキーが設定されていません');
      return new Response(JSON.stringify({ error: 'APIキーが設定されていません' }), { status: 500 });
    }

    const radius = 1500;
    const keywords = 'スターバックス';


    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=cafe&keyword=${encodeURIComponent(keywords)}&language=ja&key=${apiKey}`;

    console.log('Google Places API URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Google Places APIリクエスト失敗:', response.status);
      return new Response(JSON.stringify({ error: 'Google Places APIリクエスト失敗' }), { status: response.status });
    }

    const data = await response.json();

    console.log('Google Places APIレスポンス件数:', data.results.length);

    const chainNames = keywords.split('|');
    const filteredResults = (data.results || []).filter(place => {
      return chainNames.some(name => place.name.includes(name));
    });

    console.log('絞り込み後の件数:', filteredResults.length);

    return new Response(JSON.stringify({ results: filteredResults }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('サーバーエラー:', error);
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました' }), { status: 500 });
  }
}
