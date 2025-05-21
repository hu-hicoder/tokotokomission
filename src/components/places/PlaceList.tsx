'use client';

import { usePlacesContext } from "@/context/PlacesContext";

export const PlaceList = () => {
  const { places } = usePlacesContext();

  if (places.length === 0) return null;

  return (
    <ul>
      {places.map((place) => (
        <li key={place.place_id}>
          <strong>{place.name}</strong>
          {place.vicinity && ` - ${place.vicinity}`}
        </li>
      ))}
    </ul>
  )
}
