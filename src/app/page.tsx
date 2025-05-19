'use client';

import React, { useState } from 'react';
import { MapContent } from './components/maps/map-content';

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
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch('/api/places', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lng }),
          });

          if (!res.ok) {
            throw new Error(`APIエラー: ${res.status}`);
          }

          const data = await res.json();
          setPlaces(data.results || []);
        } catch (e) {
          setError('周辺施設の取得に失敗しました');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('位置情報の取得に失敗しました');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>目的地提案デモ</h1>
      <button onClick={handleGetCurrentPosition} disabled={loading}>
        {loading ? '読み込み中...' : '現在地を取得して近くのカフェを検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <strong>{place.name}</strong> {place.vicinity && ` - ${place.vicinity}`}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20, height: 400 }}>
        <MapContent />
      </div>
    </div>
  );
}
