const apiKey = "f14c6672ce5c4e0da53185847250701";
const daysArry = getDays();

// takes a string from the input and returns an array of similar city names
async function searchLocationsByName(cityString) {
  let citiesArray = [];
  try {
    const fetchObj = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityString}`
    );
    citiesArray = await fetchObj.json();
  } catch (error) {
    citiesArray = [];
  }

  if (citiesArray && citiesArray.length > 0) {
    citiesArray.forEach((city) => {
      extractCityData(city);
    });
  } else null;
}

// constructs the cities list on input seach  and passes latitude and longitude to the api
function extractCityData(city) {
  const fullName = `${city.name}, ${city.country}`;
  const lat = city.lat;
  const lon = city.lat;
  console.log(fullName);
}

//gets yesterday, and day before yesterday dates in iso format to be passed into the api
function getDays() {
  const today = new Date();
  return [
    new Date(today.setDate(today.getDate() - 1)).toISOString().split("T")[0],
    new Date(today.setDate(today.getDate() - 2)).toISOString().split("T")[0],
  ];
}

// helper that takes a fetch url and fetches the weather object from the api
async function fetchWeatherData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }
  return response.json();
}

// calls the api to fetch data for 5 days, gets the date from getDays and runs it to fetchWeatherData
async function getLocationWeather(lat, lon) {
  try {
    const [
      {
        forecast: {
          forecastday: [dayN2W],
        },
      },
      {
        forecast: {
          forecastday: [dayN1W],
        },
      },
      {
        forecast: {
          forecastday: [todayW, dayP1W, dayP2W],
        },
      },
    ] = await Promise.all([
      fetchWeatherData(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon}&dt=${daysArry[1]}`
      ),
      fetchWeatherData(
        `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${lat},${lon}&dt=${daysArry[0]}`
      ),
      fetchWeatherData(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3&aqi=no&alerts=no`
      ),
    ]);

    return [dayN2W, dayN1W, todayW, dayP1W, dayP2W];
  } catch (error) {
    console.error("Error fetching or processing weather data:", error);
    return null;
  }
}

searchLocationsByName("alex");
getLocationWeather("30.0444", "31.2357");
