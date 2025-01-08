import { createSearchListEntry, generateCards } from "./dom.js";

const weatherApiKey = "f14c6672ce5c4e0da53185847250701";
const picsApiKey = "48094774-3f4f170104c401d823480c7e4";
const daysArry = getDays();

// takes a string from the input and returns an array of similar city names
export async function searchLocationsByName(cityString) {
  let citiesArray = [];
  try {
    const fetchObj = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${weatherApiKey}&q=${cityString}`
    );
    citiesArray = await fetchObj.json();
  } catch (error) {
    citiesArray = [];
  }

  if (citiesArray && citiesArray.length > 0) {
    createSearchListEntry(citiesArray);
  } else null;
}

// gets a background image to represent the city searched for
export async function fetchImage(string) {
  try {
    const imgObj = await fetch(
      `https://pixabay.com/api/?key=${picsApiKey}&q=${string}&image_type=photo&category=places`
    );
    const imgData = await imgObj.json();
    const randomImg = Math.floor(Math.random() * (imgData.hits.length - 1));
    const root = document.documentElement;
    root.style.setProperty(
      "--bg-img",
      `url(${imgData.hits[randomImg].webformatURL})`
    );
  } catch (error) {
    return null;
  }
}

//gets yesterday, and day before yesterday dates in iso format to be passed into the api
function getDays() {
  const today = new Date();
  return [
    new Date(today.setDate(today.getDate() - 1)).toISOString().split("T")[0], //yesterday [0]
    new Date(today.setDate(today.getDate() - 2)).toISOString().split("T")[0], // day before yesterday [1]
  ];
}

// calls the api to fetch data for 5 days, gets the date from getDays and runs it to fetchWeatherData
export async function getLocationWeather(city, fullName) {
  const lat = city.lat;
  const lon = city.lon;
  try {
    const forecastObj = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
    );
    const forecastJSON = await forecastObj.json();

    const [day1, day2, day3] = forecastJSON.forecast.forecastday;

    const cardsArr = [day1, day2, day3];
    console.log(cardsArr);
    generateCards(cardsArr, fullName);
  } catch (error) {
    console.error("Error fetching or processing weather data:", error);
    return null;
  }
}

//searchLocationsByName("alex");
