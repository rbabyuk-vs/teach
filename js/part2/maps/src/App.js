import { GoogleMap, LoadScript, Polygon, Autocomplete } from "@react-google-maps/api";
import { useState, useRef } from "react";

const center = { lat: 49.8484704, lng: 23.999662 };
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


const deliveryZone1 = [
  { lat: 49.85, lng: 24.00 },
  { lat: 49.8570, lng: 24.0216 },
  { lat: 49.832610, lng: 24.040917 },
  { lat: 49.826141, lng: 24.009679 },
  { lat: 49.830436, lng: 23.968146 },
];

const deliveryZone2 = [
  { lat: 49.869778, lng: 24.015931 },
  { lat: 49.827723, lng: 24.059147 },
  { lat: 49.805638, lng: 23.982614 },
  { lat: 49.823901, lng: 23.952823 },
  { lat: 49.861828, lng: 23.969845 },
];

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
];

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const autocompleteRef = useRef(null);

  // Function to handle place selection
  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place && place.geometry) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      } else {
        console.error("No geometry found for the selected place.");
      }
    }
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        
        {/* Autocomplete Search Box */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search for street or building..."
            className="search-box"
          />
        </Autocomplete>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "10px", overflow: "hidden" }}
          zoom={14}
          center={mapCenter}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          <Polygon paths={deliveryZone1} options={{ fillColor: "lightgreen", strokeColor: "green" }} />
          <Polygon paths={deliveryZone2} options={{ fillColor: "lightyellow", strokeColor: "yellow" }} />
        </GoogleMap>

      </LoadScript>
    </div>
  );
};

export default MapComponent;
