export type LatLag = {
       lat: number;
       lng: number;
     };
     
     export type Place = {
       place_id: string;
       name: string;
       vicinity?: string;
       geometry: LatLag;
     };
