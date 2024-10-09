import polyline from "@mapbox/polyline";

class PolylineToCoordinates {
  static fetchCoordinates = async (
    API_KEY,
    originLat,
    originLong,
    destLat,
    destLong
  ) => {
    const data = await fetch(
      `https://api.olamaps.io/routing/v1/directions?origin=${originLat},${originLong}&destination=${destLat},${destLong}&api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        // console.log(response)
        return response.json();
      })
      .then((data) => {
        // console.log(
        //   "\x1b[34mPolylineToCoordinatesClass: fetched data successfully from ola maps api\x1b[0m"
        // );
        return data;
      })
      .catch((err) => {
        console.error(
          "\x1b[31mPolylineToCoordinatesClass: Error while fetching data from ola map api in static method of PolylineToCoordinates\x1b[0m\n" +
            err
        );
      });

    return polyline.decode(data.routes[0].overview_polyline);
  };
}
export default PolylineToCoordinates;
