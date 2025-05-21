'use client';

import { createContext, ReactNode, useContext } from 'react';
import { usePlaces } from '@/hooks/usePlaces';

type PlacesContextValue = ReturnType<typeof usePlaces>;

const PlacesContext = createContext<PlacesContextValue | undefined>(undefined);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const placesData = usePlaces();
  return (
    <PlacesContext.Provider value={placesData}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesContext() {
  const ctx = useContext(PlacesContext);
  if (!ctx) {
    throw new Error('usePlacesContext must be used within PlacesProvider');
  }
  return ctx;
}