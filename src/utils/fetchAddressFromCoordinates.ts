import { Location } from "../components/GoogleMaps";
import { googleMapsApiKey } from "../constants";

export async function fetchAddressFromCoordinates(
  lat: number,
  lng: number
): Promise<Location> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`;
    console.info("Fetching URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      // Log detailed response information
      console.error("Response not OK:", response);
      throw new Error(
        `Failed to fetch address: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    // Log the response data for debugging
    console.info("Response Data:", data);

    if (data.status === "OK") {
      const result = data.results[0] || {};

      const place: Location = {
        name: result.formatted_address || "",
        id: result.place_id || "",
        place_type: result.types ? result.types[0] : "",
        coordinates: result.geometry ? result.geometry.location : null,
      };

      return place;
    } else {
      console.error("Google Maps API returned error status:", data.status);
      throw new Error(
        `Failed to fetch address: ${data.error_message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error fetching address:", error);

    // Provide a fallback value or rethrow error depending on your needs
    throw error;
  }
}
