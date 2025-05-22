'use client';

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Place = {
  place_id: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
};

type Props = {
  places?: Place[]; // 取得場所がある場合も、無い場合も対応できるようにoptionalに
  center?: { lat: number; lng: number }; // centerもoptionalに
};

export const MapContent = ({ places = [], center = { lat: 35.656, lng: 139.737 } }: Props) => {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''}
    >
      <Map
        key={`${center.lat}-${center.lng}`}
        center={center}
        zoom={15}
        gestureHandling="greedy"
        disableDefaultUI={true}
        style={{ width: '100%', height: '400px' }}
      >
        {places.map((place) => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            title={place.name}
          />
        ))}
      </Map>
    </APIProvider>
  );
};
