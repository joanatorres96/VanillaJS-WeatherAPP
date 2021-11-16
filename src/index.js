function currentTime() {
  let time = document.querySelector("#day-hour");
  let now = new Date();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = week[now.getDay()];
  let minutes = now.getMinutes();
  let hour = now.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  time.innerHTML = `${weekday}, ${hour}:${minutes}`;
}
currentTime();
//
function showInfo(response) {
  let temp = Math.round(response.data.main.temp);
  let name = response.data.name;
  let place = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");

  place.innerHTML = `${name}, `;
  temperature.innerHTML = `${temp}°`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  getCityInfo(city.value);
}
function getCityInfo(cityName) {
  let unit = "metric";
  let apiKey = "bfe2f28f38a462ece1d27d383dea4139";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showInfo);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

//
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "bfe2f28f38a462ece1d27d383dea4139";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showInfo);
}

let locationButton = document.querySelector("#current");
locationButton.addEventListener("click", currentLocation);

getCityInfo("Lisbon");
