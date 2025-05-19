'use client';

import React, { useState } from 'react';

type Place = {
  place_id: string;
  name: string;
  vicinity?: string;
};

export default function Page() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetCurrentPosition = () => {
    if (!navigator.geolocation) {
      setError('位置情報は利用できません');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch('/api/places', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lng, type: 'cafe' }), // 例：カフェを検索
          });

          if (!res.ok) {
            throw new Error(`APIエラー: ${res.status}`);
          }

          const data = await res.json();
          setPlaces(data.results);
        } catch (e) {
          setError('施設情報の取得に失敗しました');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('位置情報の取得に失敗しました');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>目的地提案デモ</h1>
      <button onClick={handleGetCurrentPosition} disabled={loading}>
        {loading ? '読み込み中...' : '現在地を取得して近くのカフェ検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <strong>{place.name}</strong> {place.vicinity && ` - ${place.vicinity}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
