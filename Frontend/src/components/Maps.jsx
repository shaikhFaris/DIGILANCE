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
  const [destPlace, setDestPlace] = useState("");
  const initLocationMarker = { lng: 77.48446, lat: 13.08374 };
  const zoom = 15;

  useEffect(() => {
    fetch(
      "http://localhost:4331/api/navigation?originLat=13.08374&originLong=77.48446&destLat=13.03057&destLong=77.56489",
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLatlngs(data);
        console.log(
          "coordinates (processed from polyline) recieved successfully"
        );
        setDestMarker({
          lat: data[data.length - 1][0],
          lng: data[data.length - 1][1],
        });
        // console.log(destMarker);
        setRenderPolyline(true);
        setRenderMarker(true);
      })
      .catch((err) => {
        console.error(
          "error while fetching polyline coordniates of destination"
        );
      });
  }, []);

  return (
    <>
      <div className="relative w-full h-screen">
        <MapContainer
          center={initLocationMarker}
          style={{ zIndex: 1 }}
          id="map"
          zoom={zoom}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={initLocationMarker} />
          {RenderPolyline && (
            <Polyline positions={latlngs} color="#1565c0" weight={7} />
          )}
          {RenderMarker && <Marker position={destMarker} />}
        </MapContainer>
        <button className="absolute w-1/12 bottom-5 font-bold  left-5 z-10 bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
          Start
        </button>
      </div>
    </>
  );
}

export default Maps;
