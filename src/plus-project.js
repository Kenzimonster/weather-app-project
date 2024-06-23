//Variables
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

//Functions
function formatTopDate(date) {
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
  let month = months[date.getMonth()];
  let newDate = date.getDate();
  let year = date.getFullYear();
  return `${month} ${newDate}, ${year}`;
}
function formatDayTime(date) {
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function greetUser() {
  let city = prompt("Please enter a city?");
  city = city.toLowerCase().trim();
  let now = new Date();
  let descriptionDayTime = document.querySelector("#day-time");
  descriptionDayTime.innerHTML = formatDayTime(now);
  let topDate = document.querySelector("#date-top");
  topDate.innerHTML = formatTopDate(now);
  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let temperatureCelsius = Math.round(temperature);
    let temperatureFahrenheit = Math.round(temperature * 1.8 + 32);
    alert(
      `It is currently ${temperatureCelsius}°C (${temperatureFahrenheit}°F) in ${city} with a humidity of ${humidity}%`
    );
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${city.toUpperCase()}`;
  } else {
    alert(`Sorry, we don't know the weather for this city, try going
      to https://www.google.com/search?q=weather+${city}`);
  }
}
function citySearch(event) {
  event.preventDefault();
  function apiQuery(response) {
    let currentTemp = Math.round(response.data.temperature.current);
    let newTemp = document.querySelector("#current-temperature-value");
    newTemp.innerHTML = currentTemp;

    let newHumidity = document.querySelector("#current-city-humidity");
    newHumidity.innerHTML = response.data.temperature.humidity;

    let newWindspeed = document.querySelector("#current-city-windspeed");
    newWindspeed.innerHTML = response.data.wind.speed;

    let newDescription = document.querySelector("#current-city-description");
    newDescription.innerHTML = response.data.condition.description;

    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
  }
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.toLowerCase().trim();
  let apiKey = `3at0foeb77eba84a5c21cf21f38b13e9`;
  let searchLink = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(searchLink).then(apiQuery);

  let now = new Date();
  let descriptionDayTime = document.querySelector("#day-time");
  descriptionDayTime.innerHTML = formatDayTime(now);
  let topDate = document.querySelector("#date-top");
  topDate.innerHTML = formatTopDate(now);
}

//Calls and interacting
greetUser();

let changeCity = document.querySelector("#city-search");
changeCity.addEventListener("submit", citySearch);
