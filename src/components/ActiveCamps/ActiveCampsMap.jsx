import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import camps from "../../assets/camps.json";

// Custom marker icon
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Ctrl+Wheel Zoom handler
const CtrlZoom = () => {
  const map = useMap();

  useEffect(() => {
    map.scrollWheelZoom.disable(); // Disable default scroll zoom

    const onWheel = (e) => {
      if (e.originalEvent.ctrlKey) {
        map.scrollWheelZoom.enable();
        setTimeout(() => map.scrollWheelZoom.disable(), 50);
      }
    };

    map.on("wheel", onWheel);

    return () => map.off("wheel", onWheel);
  }, [map]);

  return null;
};

const ActiveCampsMap = () => {
  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">Active Medical Camps</h2>
        <p className="text-gray-600 mt-2">
          Explore the geographic spread of our medical camps across underserved areas in Bangladesh.
        </p>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden">
        <MapContainer
          center={[23.6850, 90.3563]}
          zoom={7}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <CtrlZoom />
          {camps.map((camp) => (
            <Marker key={camp.id} position={[camp.lat, camp.lng]} icon={icon}>
              <Popup>
                <strong>{camp.name}</strong>
                <br />
                Location: {camp.lat}, {camp.lng}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ActiveCampsMap;
