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

  const handleClick = () => {
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
            body: JSON.stringify({ lat, lng }),
          });

          if (!res.ok) {
            throw new Error('APIリクエストに失敗しました。');
          }

          const data = await res.json();
          setPlaces(data.results);
        } catch (err) {
          console.error(err);
          setError('周辺のカフェの取得に失敗しました');
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
    <div style={{ padding: '20px' }}>
      <h1>目的地提案デモ（周辺のカフェ検索）</h1>

      <button onClick={handleClick} disabled={loading}>
        {loading ? '検索中...' : '現在地を取得して近くのカフェを検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <strong>{place.name}</strong>
            {place.vicinity && `（${place.vicinity}）`}
          </li>
        ))}
      </ul>
    </div>
  );
}
