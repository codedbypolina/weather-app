// Display the current date and time using JavaScript

let currentDate = new Date();
let day = currentDate.getDate();
let year = currentDate.getFullYear();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[currentDate.getMonth()];

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekday = weekdays[currentDate.getDay()];

let date = document.querySelector("#date");
date.innerHTML = `${weekday}, ${month} ${day}`;

let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

let time = document.querySelector("#current-time");
time.innerHTML = `${hour}:${minutes}`;

// Add a search engine, when searching for a city, display the city name on the page after the user submits the form.

function search(city) {
  let apiKey = "01e2a719a4f5c5a36214df788b170932";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
  document.querySelector("h1").innerHTML = `${city}`;
}

let citySearch = document.querySelector(".search-button");
citySearch.addEventListener("submit", searchCity);

// Display the current weather of the city.

function displayWeather(response) {
  //City
  let city = document.querySelector("#search-input").value;
  document.querySelector("h1").innerHTML = `${response.data.name}`;

  //Current temperature
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("h2").innerHTML = `${temperature}°C`;

  let maxTemperature = Math.round(response.data.main.temp_max);
  let minTemperature = Math.round(response.data.main.temp_min);
  document.querySelector(
    "#peak-temperature"
  ).innerHTML = `${maxTemperature}°C / ${minTemperature}°C`;

  //Feels like
  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `${feelsLike}°C`;

  //Humidity
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  //Wind Speed
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind-speed").innerHTML = `${windSpeed}mph`;

  //Description
  let weather = response.data.weather[0].main;
  document.querySelector("#weather").innerHTML = `${weather}`;
}

search("New York");

//Add a Current Location button.

function accessGeolocation(position) {
  let apiKey = "01e2a719a4f5c5a36214df788b170932";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(accessGeolocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
