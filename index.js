function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "eaf7d01f74cab187ef4b58c7a2bb6662";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function updateTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  document.querySelector(
    "#current-day-time"
  ).innerHTML = `${day} ${hours}:${minutes}`;
}

function weatherCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "eaf7d01f74cab187ef4b58c7a2bb6662";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#temp-now").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector("#current-city").innerHTML = response.data.name;
}

updateTime();
searchCity("Zurich");

let citySearch = document.querySelector(".search-form");
citySearch.addEventListener("submit", handleSubmit);

let useCurrentLocation = document.querySelector("#current-location-button");
useCurrentLocation.addEventListener("click", weatherCurrentLocation);
