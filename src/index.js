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
  document.querySelector("#DayTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#NightTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#real-feel").innerHTML = Math.round(
    response.data.main.feels_like
  );
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

searchCity("Vilnius");

///
function convertToFarenheitDay(event) {
  event.preventDefault();
  let DayTemperature = document.querySelector("#DayTemperature");
  let NewDayTemperature = DayTemperature.innerHTML;
  NewDayTemperature = Number(NewDayTemperature);
  DayTemperature.innerHTML = Math.round((NewDayTemperature * 9) / 5 + 32);
}
function convertToFarenheitNight(event) {
  let NightTemperature = document.querySelector("#NightTemperature");
  let NewNightTemperature = NightTemperature.innerHTML;
  NewNightTemperature = Number(NewNightTemperature);
  NightTemperature.innerHTML = Math.round((NewNightTemperature * 9) / 5 + 32);
}

function convertToCelciusDay(event) {
  event.preventDefault();
  let DayTemperature = document.querySelector("#DayTemperature");
  DayTemperature.innerHTML = 7;
}

function convertToCelciusNight(event) {
  event.preventDefault();
  let NightTemperature = document.querySelector("#NightTemperature");
  NightTemperature.innerHTML = 1;
}

let temperatureFarenheitDay = document.querySelector("#fahrenheit-link");
temperatureFarenheitDay.addEventListener("click", convertToFarenheitDay);

let temperatureFarenheitNight = document.querySelector("#fahrenheit-link");
temperatureFarenheitNight.addEventListener("click", convertToFarenheitNight);

let temperatureCelciusDay = document.querySelector("#celcius-link");
temperatureCelciusDay.addEventListener("click", convertToCelciusDay);
let temperatureCelciusNight = document.querySelector("#celcius-link");
temperatureCelciusNight.addEventListener("click", convertToCelciusNight);
