const mykey = "b4a5b744174e43287529d8fbbcf7bd53";
const units = [{ unit: "imperial" }, { unit: "metric" }];
let unitChoice = units[1].unit;

const locationsList = async (searchTerm) => {
  const openWeatherJson = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${mykey}`,
    { mode: "cors" }
  );
  const locationsList = await openWeatherJson.json();
  console.log(locationsList);
  locationWeather(locationsList[0].lat, locationsList[0].lon);
};

const locationWeather = async (lat, lon) => {
  const openWeatherJson = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${mykey}&units=${unitChoice}`
  );
  const locationWeather = await openWeatherJson.json();
  console.log(locationWeather);
};
locationsList("cairo");
