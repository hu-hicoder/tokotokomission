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

    const radius = 300;
    const keywords = 'マクドナルド|スターバックス|タリーズ|ドトール|カフェベローチェ|ロッテリア|モスバーガー|コメダ珈琲|ACCEA CAFE|PRONTO|エクセルシオールカフェ|サンマルクカフェ|ヴィ・ド・フランス|ルノアール|サンマルクカフェ|ミスタードーナツ|むさしの森珈琲|上島珈琲店|星乃珈琲店|倉式珈琲|尾道浪漫珈琲';

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=cafe&keyword=${encodeURIComponent(keywords)}&language=ja&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Google Places APIリクエスト失敗' }), { status: response.status });
    }

    const data = await response.json();

    // ここで絞り込みをかける（名前にチェーン店名が含まれるか）
    const chainNames = keywords.split('|');
    const filteredResults = (data.results || []).filter(place => {
      return chainNames.some(name => place.name.includes(name));
    });

    return new Response(JSON.stringify({ results: filteredResults }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました' }), { status: 500 });
  }
}


