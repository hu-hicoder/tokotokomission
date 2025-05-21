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

    const radius = 3000; // 3km
    // チェーン店名をパイプ区切りで指定
    const keywords =
      'スターバックス|タリーズ|コメダ珈琲|ドトール|エクセルシオールカフェ|サンマルクカフェ|星乃珈琲店|マクドナルド|モスバーガー|ミスタードーナツ|ケンタッキー|バーガーキング';

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=cafe&keyword=${encodeURIComponent(
      keywords
    )}&language=ja&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Google Places APIリクエスト失敗' }), { status: response.status });
    }

    const data = await response.json();

    // サーバー側でも名前でさらに絞り込み（確実性UP）
    const chainNames = keywords.split('|');
    const filteredResults = (data.results || []).filter((place) =>
      chainNames.some((name) => place.name.includes(name))
    );

    return new Response(JSON.stringify({ results: filteredResults }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました' }), { status: 500 });
  }
}
