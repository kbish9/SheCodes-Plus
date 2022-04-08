let now = new Date();
let h5 = document.querySelector("h5");
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

h5.innerHTML = `${day}, ${hours}:${minutes}`;

function city(event) {
  event.preventDefault();
  let input = document.querySelector("#search");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  let apiKey = "d8e366c15b60dabbe9f54b799921805a";
  let citySearch = `${input.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric`;
 
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector(".tempToday");
    temp.innerHTML = `${temperature}°C`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let search = document.querySelector("#search");
search.addEventListener("search", city);

function showForcast(position) {
  let h6 = document.querySelector("h6");
  h6.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${position.name}`;
  let apiKey = "d8e366c15b60dabbe9f54b799921805a";
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&units=metric`;

  function showLocationTemp(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector(".tempToday");
    temp.innerHTML = `${temperature}°C`;
  }
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showLocationTemp);
}

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showForcast);
}

let button = document.querySelector("#location");
button.addEventListener("click", currentPosition);
