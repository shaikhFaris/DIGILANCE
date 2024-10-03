import polyline from "@mapbox/polyline";

const API_KEY="9sXz2CALz06ZFOenz2vXqZ9BWAn3JCZvUjqe09mN"
const originLat="13.08374"
const originLong="77.48446"
const destLat="13.08444"
const destLong="77.49033"

const data=await fetch(`https://api.olamaps.io/routing/v1/directions?origin=${originLat},${originLong}&destination=${destLat},${destLong}&api_key=${API_KEY}`,{
    method:"POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
      }}
)
.then((response)=>{
    // console.log(response)
    return response.json();
})
.then((data)=>{
    // console.log(data)
    return data;
})

const route_polyline=data.routes[0].overview_polyline;
console.log(route_polyline);
const cordinates=polyline.decode(route_polyline)
console.log(cordinates);

export {cordinates};
// coordinates is an 2d array of cordinates pon the road.