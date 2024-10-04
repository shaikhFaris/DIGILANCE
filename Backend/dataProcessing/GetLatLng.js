class GetDestinationData {
  static fetchDestinationData = async (input) => {
    let DestinationData = [];
    await fetch(
      `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=9sXz2CALz06ZFOenz2vXqZ9BWAn3JCZvUjqe09mN`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
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
    return DestinationData;
  };
}
