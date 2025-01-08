import {
  searchLocationsByName,
  getLocationWeather,
  fetchImage,
} from "./app.js";

function resetSearchBar() {
  const searchBar = document.getElementById("searchBar");
  searchBar.value = "";
  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.style.display = "none";
}

(function () {
  const cancelBtn = document.getElementById("cancel-btn");
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      resetSearchBar();
    }
  });
  searchBar.addEventListener("input", () => {
    const string = searchBar.value;
    if (string && string.trim() !== "") {
      searchLocationsByName(string);
    }
  });
  cancelBtn.addEventListener("click", () => {
    resetSearchBar();
  });
})();

export function createSearchListEntry(citiesArray) {
  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.style.display = "initial";
  resultsContainer.innerHTML = "";
  citiesArray.forEach((city) => {
    const fullName = `${city.name}, ${city.country}`;
    const webName = [
      city.name.replace(/\s+/g, "+"),
      city.country.replace(/\s+/g, "+"),
    ].join("+");

    const container = document.createElement("div");
    const cityName = document.createElement("p");
    cityName.textContent = fullName;
    container.appendChild(cityName);
    resultsContainer.appendChild(container);

    container.addEventListener("mouseover", () => {
      const searchBar = document.getElementById("searchBar");
      searchBar.value = fullName;
    });

    container.addEventListener("click", () => {
      getLocationWeather(city, fullName);
      fetchImage(webName);
      resetSearchBar();
    });
  });
}

export function generateCards(arr, fullName) {
  if (arr && arr.length > 0) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    const cityName = document.createElement("h2");
    const cardsDiv = document.createElement("div");
    cityName.textContent = fullName;
    container.append(cityName, cardsDiv);

    arr.forEach((day) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const heading = document.createElement("h3");
      heading.textContent = day.date;

      const temp = document.createElement("p");
      temp.textContent = day.day.avgtemp_c + "C";

      const img = document.createElement("img");
      img.src = day.day.condition.icon;

      const condition = document.createElement("span");
      condition.textContent = day.day.condition.text;

      card.append(heading, img, temp, condition);
      cardsDiv.append(card);
    });
  }
}
