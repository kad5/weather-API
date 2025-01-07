import {
  searchLocationsByName,
  getLocationWeather,
  fetchImage,
} from "./app.js";

// formats the city name for the searchlist display and to be passed into the images fetch

export function createSearchListEntry(city) {
  const fullName = `${city.name}, ${city.country}`;
  const webName = [
    city.name.replace(/\s+/g, "+"),
    city.country.replace(/\s+/g, "+"),
  ].join("+");

  const container = document.createElement("div");
  const cityName = document.createElement("p");
  cityName.textContent = fullName;
  container.appendChild(cityName);
  document.body.appendChild(container);

  container.addEventListener("click", () => {
    getLocationWeather(city.lat, city.lon);
    fetchImage(webName);
  });
}
