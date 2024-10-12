import React, { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useSelector, useDispatch } from "react-redux";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Maps() {
  const dispatch = useDispatch();
  const destLatLang = useSelector((state) => state.destLatLang.value);
  const [RenderPolyline, setRenderPolyline] = useState(false);
  const [RenderMarker, setRenderMarker] = useState(false);
  const [latlngs, setLatlngs] = useState([]);
  const [destMarker, setDestMarker] = useState({ lat: null, lng: null });
  const [renderMap, setrenderMap] = useState(false);
  const [userLocation, setuserLocation] = useState({
    lat: null,
    lng: null,
  });
  const zoom = 14;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setuserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setrenderMap(true);
    });
  }, []);

  useEffect(() => {
    console.log(destLatLang);

    if (destLatLang != null) {
      fetch(
        `http://localhost:4331/api/navigation?originLat=${userLocation.lat}&originLong=${userLocation.lng}&destLat=${destLatLang.lat}&destLong=${destLatLang.lng}`,
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
    }
  }, [destLatLang]);

  return (
    <>
      {renderMap ? (
        <div className="relative w-full h-screen">
          <MapContainer
            center={userLocation}
            style={{ zIndex: 1 }}
            id="map"
            zoom={zoom}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation} />
            {RenderPolyline && (
              <Polyline positions={latlngs} color="#1565c0" weight={7} />
            )}
            {RenderMarker && <Marker position={destMarker} />}
          </MapContainer>
          <button className="absolute w-1/12 bottom-5 font-bold  left-5 z-10 bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
            Start
          </button>
        </div>
      ) : (
        <div className=" flex justify-center items-center w-full h-screen">
          <div className=" font-bold text-5xl text-center leading-relaxed">
            Please give us access to your location <br />
            We wont sell you out !!
          </div>
        </div>
      )}
    </>
  );
}

export default Maps;
