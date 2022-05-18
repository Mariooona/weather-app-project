function formatedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let currentTimeDate = document.querySelector("#currentDate");
let currentTime = new Date();

currentTimeDate.innerHTML = formatedDate(currentTime);

///

function searchCity(city) {
  let apiKey = "c00315bc8e5475ad20314024ada12a35";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function ShowCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let DayTemperature = document.querySelector("#DayTemperature");
  let NightTemperature = document.querySelector("#NightTemperature");

  DayCelciusTemperature = response.data.main.temp_max;
  NightCelciusTemperature = response.data.main.temp_min;

  DayTemperature.innerHTML = Math.round(DayCelciusTemperature);
  NightTemperature.innerHTML = Math.round(NightCelciusTemperature);
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position);
  let apiKey = "c00315bc8e5475ad20314024ada12a35";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let CurentButton = document.querySelector("#current-location-button");
CurentButton.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", ShowCity);

///
function convertToFahrenheitDay(event) {
  event.preventDefault();
  let DayTemperatureElement = document.querySelector("#DayTemperature");
  let DayFahrenheitTemperature = (DayCelciusTemperature * 9) / 5 + 32;
  CelciusLinkDay.classList.remove("active");
  FahrenheitLinkDay.classList.add("active");
  DayTemperatureElement.innerHTML = Math.round(DayFahrenheitTemperature);
}
function convertToFahrenheitNight(event) {
  event.preventDefault();
  let NightTemperatureElement = document.querySelector("#NightTemperature");
  let NightFahrenheitTemperature = (NightCelciusTemperature * 9) / 5 + 32;
  CelciusLinkNight.classList.remove("active");
  FahrenheitLinkNight.classList.add("active");
  NightTemperatureElement.innerHTML = Math.round(NightFahrenheitTemperature);
}

function convertToCelciusDay(event) {
  event.preventDefault();
  let DayTemperatureElement = document.querySelector("#DayTemperature");
  CelciusLinkDay.classList.add("active");
  FahrenheitLinkDay.classList.remove("active");
  DayTemperatureElement.innerHTML = Math.round(DayCelciusTemperature);
}

function convertToCelciusNight(event) {
  event.preventDefault();
  let NightTemperatureElement = document.querySelector("#NightTemperature");
  CelciusLinkNight.classList.add("active");
  FahrenheitLinkNight.classList.remove("active");
  NightTemperatureElement.innerHTML = Math.round(NightCelciusTemperature);
}

let DayCelciusTemperature = null;
let NightCelciusTemperature = null;

let FahrenheitLinkDay = document.querySelector("#fahrenheit-link");
FahrenheitLinkDay.addEventListener("click", convertToFahrenheitDay);

let FahrenheitLinkNight = document.querySelector("#fahrenheit-link");
FahrenheitLinkNight.addEventListener("click", convertToFahrenheitNight);

let CelciusLinkDay = document.querySelector("#celcius-link");
CelciusLinkDay.addEventListener("click", convertToCelciusDay);
let CelciusLinkNight = document.querySelector("#celcius-link");
CelciusLinkNight.addEventListener("click", convertToCelciusNight);
searchCity("Vilnius");
