'use client';

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type Props = {
       places: Place[];
       center: LatLag;
     };

export const MapContent = ({ places, center }: Props) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        key={`${center.lat}-${center.lng}`}
        center={center}
        zoom={15}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''}
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

