function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=imperial`;
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

  let newTime = `${day} ${hours}:${minutes}`;

  let currentDayTime = document.querySelector("#current-day-time");
  currentDayTime.innerHTML = newTime;
}

function weatherCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let longitude = position.coords.longitude;
  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = `Your current location`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let currentTemp = response.data.main.temp;
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = `${Math.round(currentTemp)}`;
}

updateTime();

let citySearch = document.querySelector(".search-form");
citySearch.addEventListener("submit", updateCity);

let useCurrentLocation = document.querySelector("#current-location-button");
useCurrentLocation.addEventListener("click", weatherCurrentLocation);

let apiKey = "eaf7d01f74cab187ef4b58c7a2bb6662";
