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
function convertToFarenheitDay(event) {
  event.preventDefault();
  let NewFarenheitDayTemperature = document.querySelector("#DayTemperature");
  CelciusLinkDay.classList.remove("active");
  FahrenheitLinkDay.add("active");
  let fahrenheitDayTemperature = (DayCelciusTemperature * 9) / 5 + 32;
  NewFarenheitDayTemperature.innerHTML = Math.round(fahrenheitDayTemperature);
}
function convertToFarenheitNight(event) {
  event.preventDefault();
  let NewfarenheitNightTemperature =
    document.querySelector("#NightTemperature");
  CelciusLinkNight.classList.remove("active");
  FahrenheitLinkNight.add("active");
  let fahrenheitNightTemperature = (NightCelciusTemperature * 9) / 5 + 32;
  NewFahrenheitNightTemperature.innerHTML = Math.round(
    fahrenheitNightTemperature
  );
}

function convertToCelciusDay(event) {
  event.preventDefault();
  let NewCelciusDayTemperature = document.querySelector("#DayTemperature");
  CelciusLinkDay.classList.add("active");
  temperatureFarenheitDay.remove("active");
  NewCelciusDayTemperature.innerHTML = Math.round(DayCelciusTemperature);
}

function convertToCelciusNight(event) {
  event.preventDefault();
  let NewCelciusNightTemperature = document.querySelector("#NightTemperature");
  CelciusLinkNight.classList.add("active");
  temperatureFarenheitNight.remove("active");
  NewCelciusNightTemperature.innerHTML = Math.round(NightCelciusTemperature);
}

let DayCelciusTemperature = null;
let NightCelciusTemperature = null;

let FahrenheitLinkDay = document.querySelector("#fahrenheit-link");
FahrenheitLinkDay.addEventListener("click", convertToFarenheitDay);

let FahrenheitLinkNight = document.querySelector("#fahrenheit-link");
FahrenheitLinkNight.addEventListener("click", convertToFarenheitNight);

let CelciusLinkDay = document.querySelector("#celcius-link");
CelciusLinkDay.addEventListener("click", convertToCelciusDay);
let CelciusLinkNight = document.querySelector("#celcius-link");
CelciusLinkNight.addEventListener("click", convertToCelciusNight);
searchCity("Vilnius");
