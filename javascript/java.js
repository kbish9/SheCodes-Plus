function formatDate(timestamp) {
  let date = new Date(timestamp);
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

function displayForecast() {
  let temperatureForecast = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["thu", "fri", "sat", "sun", "mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <div class="card" style="width: 10rem" id="weather-forecast">
    
        <h5 class="card-temp">
          <div class="temp">
            18 °C
          </div>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          Expected Temperature
        </h6>
        <p class="card-day">${day}</p>
      
    </div>
  </div>
 `;
  });
  forecastHTML = forecastHTML + "</div>";
  temperatureForecast.innerHTML = forecastHTML;
}

function displayTemp(response) {
  celsius = response.data.main.temp;

  let temperatureToday = document.querySelector("#temp");
  let cityBegin = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  temperatureToday.innerHTML = Math.round(response.data.main.temp);
  cityBegin.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "d8e366c15b60dabbe9f54b799921805a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  search(citySearch.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsius * 9) / 5 + 32;
  temperatureToday.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureToday = document.querySelector("#temp");
  temperatureToday.innerHTML = Math.round(celsius);
}

let celsius = null;

let form = document.querySelector("#search");
form.addEventListener("search", handleSubmit);

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", displayCelsius);

search("London");
displayForecast();
