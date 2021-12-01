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
  console.log(response.data);
  let name = response.data.name;
  let humidityInfo = response.data.main.humidity;
  let windInfo = response.data.wind.speed;
  let weatherInfo = response.data.weather[0].description;
  let feelsLikeInfo = response.data.main.feels_like;
  let place = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherIcon = document.querySelector("#weather-icon");
  let weatherState = document.querySelector("#weather-state");
  celsiusTemp = response.data.main.temp;
  place.innerHTML = `${name}`;
  weatherState.innerHTML = weatherInfo;
  temperature.innerHTML = `${Math.round(celsiusTemp)}º`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(feelsLikeInfo)}º`;
  humidity.innerHTML = `Humidity: ${humidityInfo}%`;
  windSpeed.innerHTML = `Wind Speed: ${windInfo}km/h`;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("click", currentLocation);

getCityInfo("Lisbon");

let celsiusTemp = null;

function showCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp) + "º";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(fahrenheitTemp) + "º";
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekDays[day];
}

function displayForecast(response) {
  let forecastInfo = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;

  forecastInfo.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `
  <div class="col-sm">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="36">
    <div class="forecast-temp">
      <span class="forecast-temp-max">${Math.round(
        forecastDay.temp.max
      )}º /</span>
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}º</span>
    </div>
    </div>
  `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecast.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let unit = "metric";
  let apiKey = "bfe2f28f38a462ece1d27d383dea4139";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
