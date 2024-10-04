import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Maps() {
  const [RenderPolyline, setRenderPolyline] = useState(false);
  const [RenderMarker, setRenderMarker] = useState(false);
  const [latlngs, setLatlngs] = useState([]);
  const [destMarker, setDestMarker] = useState({ lat: null, lng: null });

  useEffect(() => {
    fetch(
      "http://localhost:4331/api/navigation?originLat=13.08374&originLong=77.48446&destLat=12.9583&destLong=77.64887",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLatlngs(data);
        console.log(data[data.length - 1]);
        setDestMarker({
          lat: data[data.length - 1][0],
          lng: data[data.length - 1][1],
        });
        // console.log(destMarker);
        setRenderPolyline(true);
        setRenderMarker(true);
      });
  }, []);

  const initLocationMarker = { lng: 77.48446, lat: 13.08374 };
  const zoom = 15;

  return (
    <MapContainer center={initLocationMarker} id="map" zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Markers */}
      <Marker position={initLocationMarker} />
      {RenderPolyline && (
        <Polyline positions={latlngs} color="red" weight={7} />
      )}
      {RenderMarker && <Marker position={destMarker} />}
    </MapContainer>
  );
}

export default Maps;
