'use client';

import React, { useState } from 'react';

type Place = {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry: { location: { lat: number; lng: number } };
};

export default function Page() {
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword) {
      setError('検索ワードを入力してください');
      return;
    }
    setError(null);
    setLoading(true);
    setPlaces([]);
    setCenter(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ placeName: keyword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'APIエラー');
      }

      const data = await res.json();
      setCenter(data.location);
      setPlaces(data.places || []);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>カフェを検索</h1>
      <input
        type="text"
        placeholder="地名や駅名を入力"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: 300, padding: 8 }}
      />
      <button onClick={handleSearch} disabled={loading} style={{ marginLeft: 10 }}>
        {loading ? '検索中...' : '検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {center && places.length > 0 && (
        <>
          <p>検索地点: 緯度 {center.lat.toFixed(5)}, 経度 {center.lng.toFixed(5)}</p>
          {/* ここにMapContentを組み込むなどして地図表示も可能 */}
          <ul>
            {places.map((place) => (
              <li key={place.place_id}>
                <strong>{place.name}</strong> {place.vicinity && ` - ${place.vicinity}`}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
