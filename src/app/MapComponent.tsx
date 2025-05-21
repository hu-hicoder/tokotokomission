'use client';

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Place = {
  place_id: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
};

type Props = {
  places: Place[];
  center: { lat: number; lng: number };
};

export const MapContent = ({ places, center }: Props) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''}>
      <Map defaultZoom={15} defaultCenter={center} gestureHandling={'greedy'} disableDefaultUI={true} style={{ width: '100%', height: '400px' }}>
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
