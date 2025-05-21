'use client';

import React, { useState } from 'react';
import { MapContent } from './components/maps/map-content';
import Start from "./components/home/Start";
import CalcCalorie from "./components/layouts/Calccalorie";

type Place = {
  place_id: string;
  name: string;
  vicinity?: string;
  geometry: { location: { lat: number; lng: number } };
};

export default function Page() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({ lat: 35.656, lng: 139.737 });
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
        setCenter({ lat, lng });

        console.log('現在のcenter:', center);

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
      () => {
        setError('位置情報の取得に失敗しました');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <CalcCalorie></CalcCalorie>
      <h1>目的地提案デモ</h1>
      <button onClick={handleGetCurrentPosition} disabled={loading}>
        {loading ? '読み込み中...' : '現在地を取得して近くのカフェを検索'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <MapContent places={places} center={center} />

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
