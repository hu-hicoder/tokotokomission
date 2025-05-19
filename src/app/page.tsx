'use client';

import React from 'react';
import { MapContent } from './components/maps/map-content';

export default function Page() {
  const handleGetCurrentPosition = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        alert(`現在地の緯度: ${position.coords.latitude}\n経度: ${position.coords.longitude}`);
      },
      (error) => {
        console.error('Error getting position:', error);
        alert('位置情報の取得に失敗しました');
      }
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>目的地提案デモ</h1>
      <button onClick={handleGetCurrentPosition}>
        現在地を取得
      </button>
      <div style={{ marginTop: '20px', height: '400px' }}>
        <MapContent />
      </div>
    </div>
  );
}

