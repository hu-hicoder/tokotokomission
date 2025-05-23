'use client';

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { usePlacesContext } from '@/context/PlacesContext';


type Place = {
  place_id: string;
  name: string;
  geometry: { location: { lat: number; lng: number } };
};

type Props = {
  places?: Place[];
  center?: { lat: number; lng: number };
};

<<<<<<< HEAD
export const MapContent = () => {
  const { places = [], center = { lat: 35.656, lng: 139.737 } } = usePlacesContext();

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        key={`${center?.lat}-${center?.lng}`}
=======
export const MapContent = ({ places = [], center = { lat: 35.656, lng: 139.737 } }: Props) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        key={`${center.lat}-${center.lng}`}
>>>>>>> c922943357fe1f9959fb96136ccf0d73529ded9e
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

