export async function POST(request: Request) {
  try {
    const { placeName } = await request.json();

    if (!placeName) {
      return new Response(JSON.stringify({ error: '検索名称が必要です' }), { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'APIキーが未設定です' }), { status: 500 });
    }

    // Geocoding APIで住所→緯度経度
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return new Response(JSON.stringify({ error: '該当する場所が見つかりません' }), { status: 404 });
    }

    const location = geoData.results[0].geometry.location;
    const lat = location.lat;
    const lng = location.lng;

    // Places APIで半径300mのチェーン店カフェ検索
    const radius = 300;
    const keywords = 'マクドナルド|スターバックス|タリーズ|ドトール';
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=cafe&keyword=${encodeURIComponent(keywords)}&language=ja&key=${apiKey}`;

    const placesRes = await fetch(placesUrl);
    const placesData = await placesRes.json();

    return new Response(JSON.stringify({ location, places: placesData.results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'サーバーエラー' }), { status: 500 });
  }
}

