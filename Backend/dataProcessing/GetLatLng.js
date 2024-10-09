class GetDestinationData {
  static fetchDestinationData = async (API_KEY, input) => {
    let DestinationData = [];
    await fetch(
      `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${API_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.predictions.length == 0) {
          return;
        }
        for (let i = 0; i < data.predictions.length; i++) {
          const element = data.predictions[i];
          const temp = {
            name: element.structured_formatting.main_text,
            location: element.geometry.location,
            description: element.description,
          };
          DestinationData.push(temp);
          console.log(
            "\x1b[33m" + element.structured_formatting.main_text + "\x1b[0m\n"
          );
        }
        // console.log(DestinationData);
      })
      .catch((err) => {
        console.error("error:" + err);
      });
    // console.log(DestinationData);
    return DestinationData;
  };
}
export default GetDestinationData;
