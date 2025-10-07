import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const deliveryZone = [
  [40.72, -74.01],
  [40.73, -74.02],
  [40.71, -74.03],
  [40.70, -74.01],
];

const MapComponent = () => {
  return (
    <MapContainer center={[40.7128, -74.0060]} zoom={12} style={{ width: "100%", height: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polygon positions={deliveryZone} pathOptions={{ color: "blue", fillColor: "lightblue" }} />
    </MapContainer>
  );
};

export default MapComponent;
