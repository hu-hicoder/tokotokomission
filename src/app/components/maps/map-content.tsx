'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';

export const MapContent = () => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        defaultZoom={15}
        defaultCenter={{ lat: 35.656, lng: 139.737 }}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''}
      />
    </APIProvider>
  );
};
