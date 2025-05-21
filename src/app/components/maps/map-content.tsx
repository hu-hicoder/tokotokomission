export const MapContent = ({ places, center }: Props) => {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || ''}>
      <Map
        center={center}     // ここをdefaultCenterから変更
        zoom={15}           // defaultZoomから変更
        gestureHandling={'greedy'}
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
