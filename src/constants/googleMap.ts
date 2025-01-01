import { Coordinates } from "../components/GoogleMaps";

type Library =
  | "core"
  | "maps"
  | "places"
  | "geocoding"
  | "routes"
  | "marker"
  | "geometry"
  | "elevation"
  | "streetView"
  | "journeySharing"
  | "drawing"
  | "visualization";

export const libraries = ["places"] as Library[];

export const cities = ["Trondheim", "Eresfjird", "Harstad"];

export let currentLocationCoordinates: Coordinates;

export const googleMapsApiKey = import.meta.env
  .VITE_GOOGLE_MAPS_PLATFORM_API_KEY;
