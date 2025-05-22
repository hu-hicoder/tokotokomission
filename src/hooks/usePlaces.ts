import { useState } from 'react';

type Place = {
  place_id: string;
  name: string;
  vicinity?: string;
};

export function usePlaces() {
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

        setCenter({ lat, lng }); // ← ここでcenterを更新

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
          console.error(e);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('位置情報の取得に失敗しました');
        setLoading(false);
        console.error(error);
      }
    );
  };

  return { places, loading, error, handleGetCurrentPosition };
}
