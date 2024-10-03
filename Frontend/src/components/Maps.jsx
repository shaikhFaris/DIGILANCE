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
    fetch("http://localhost:4331/api/navigation", {
      method: "GET",
    })
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
  // const pgLocationMarker = {
  //   lat: latlngs[latlngs.length - 1][0],
  //   lng: latlngs[latlngs.length - 1][1],
  // };
  // const pgLocationMarker = { lat: 13.08444, lng: 77.49033 };
  const zoom = 15;
  // const latlngs = [
  //   [13.08364, 77.48449],
  //   [13.08368, 77.48461],
  //   [13.08377, 77.48492],
  //   [13.08385, 77.48518],
  //   [13.08396, 77.48556],
  //   [13.08405, 77.48583],
  //   [13.08412, 77.48608],
  //   [13.08419, 77.48632],
  //   [13.0842, 77.48651],
  //   [13.08421, 77.48659],
  //   [13.08422, 77.48692],
  //   [13.08426, 77.48767],
  //   [13.08428, 77.4881],
  //   [13.08432, 77.48877],
  //   [13.08431, 77.48894],
  //   [13.08428, 77.48969],
  //   [13.08424, 77.49038],
  //   [13.08443, 77.4904],
  // ];

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
