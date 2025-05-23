 'use client';

import React, { useState } from 'react';
// import { MapContent } from '../components/maps/MapContent';
// import Start from '@/components/home/Start'; 

// type Place = {
//   place_id: string;
//   name: string;
//   vicinity?: string;
//   geometry: { location: { lat: number; lng: number } };
// };

// export default function Page() {
//   const [places, setPlaces] = useState<Place[]>([]);
//   const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleGetCurrentPosition = () => {
//     if (!navigator.geolocation) {
//       setError('位置情報は利用できません');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         setCenter({ lat, lng });

//         try {
//           const res = await fetch('/api/places', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ lat, lng }),
//           });

//           if (!res.ok) {
//             throw new Error(`APIエラー: ${res.status}`);
//           }

//           const data = await res.json();
//           setPlaces(data.results || []);
//         } catch (e) {
//           setError('周辺施設の取得に失敗しました');
//         } finally {
//           setLoading(false);
//         }
//       },
//       () => {
//         setError('位置情報の取得に失敗しました');
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//     );
//   };

 return (
  <div style={{ padding: 20 }}>
    {/* カフェ検索のUI */}
    <h1>現在地から3km以内のカフェを検索</h1>
    <button onClick={handleGetCurrentPosition} disabled={loading}>
      {loading ? '検索中...' : '現在地を取得して周辺カフェを検索'}
    </button>

    {error && <p style={{ color: 'red' }}>{error}</p>}

    {center && (
      <>
        <MapContent places={places} center={center} />
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>
              <strong>{place.name}</strong> {place.vicinity && ` - ${place.vicinity}`}
            </li>
          ))}
        </ul>
      </>
    )}

    {/* Startコンポーネントも表示 */}
    <hr />
    <Start />
  </div>
);
}