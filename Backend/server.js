import express from "express";
import PolylineToCoordinates from "./dataProcessing/getRouteCoordinates.js";
import GetDestinationData from "./dataProcessing/GetLatLng.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
const PORT = 4331;

dotenv.config();
app.use(cors());
// format to write in browser
//http://localhost:4331/api/navigation?originLat=13.08374&originLong=77.48446&destLat=12.9237&destLong=77.4987

app.get("/api/navigation", async (req, res) => {
  const { originLat, originLong, destLat, destLong } = req.query;
  await PolylineToCoordinates.fetchCoordinates(
    process.env.API_KEY,
    originLat,
    originLong,
    destLat,
    destLong
  )
    .then((processed_data) => {
      console.log(
        "\x1b[34mSERVER: Navigation Data sent to client successfully from server\x1b[0m"
      );
      // console.log(processed_data);

      res.json(processed_data);
    })
    .catch((err) => {
      console.error(
        "\x1b[31mSERVER: Error while fetching data from ola map api. Check your internet connection!!!\x1b[0m\n" +
          err
      );
      res.status(500);
    });
});

app.get("/api/getDestinationData", async (req, res) => {
  const { place } = req.query;
  console.log(place);
  await GetDestinationData.fetchDestinationData(
    "9sXz2CALz06ZFOenz2vXqZ9BWAn3JCZvUjqe09mN",
    place
  )
    .then((data) => {
      if (data.length == 0) {
        console.log(
          "\x1b[31mSERVER: NO MATCHES FOR THE GIVEN DESTINATIONS\x1b[0m"
        );
        res.json(null);
      } else {
        console.log(
          "\x1b[34mSERVER: Destination Data sent successfully from server\x1b[0m"
        );
        res.json(data);
      }
    })
    .catch((err) => {
      console.error(
        "\x1b[31mError while fetching destination data\x1b[0m\n" + err
      );
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
