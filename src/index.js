let now = new Date();
let span = document.querySelector("#time");

let h = now.getHours();
let m = now.getMinutes();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
h = checkTime(h);
m = checkTime(m);
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
document.querySelector("#time").innerHTML = `${day} ${h}:${m}`;

function submitValue(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitValue);

function search(city) {
  let apiKey = "8829e8c6941f34c584905acfa8203214";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCondition);
}

function weatherCondition(response) {
  celsiusTemp = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#pressure").innerHTML = Math.round(
    response.data.main.pressure
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function searchLocation(position) {
  console.log(position);
  let apiKey = "3b7f41f709e5fa9dea292c8a3c7b4b11";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = 19;
}
let cels = document.querySelector("#celsius-link");
cels.addEventListener("click", convertToCelsius);

function convertToFarenheit(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = 66;
}
let faren = document.querySelector("#farenheit-link");
faren.addEventListener("click", convertToFarenheit);

let celsiusTemp = null;
search("Lagos");
