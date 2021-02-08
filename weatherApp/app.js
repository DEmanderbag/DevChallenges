const APIKey = "fb9db9ad6093d8f55168df2067c8b839";
let API = "https://api.openweathermap.org/data/2.5/";

const body = document.querySelector("body");
const main = document.querySelector(".main");
const weather = document.querySelector(".weather");
const highlight = document.querySelector(".highlight");
const days = document.querySelector(".days");

const getLocation = document.querySelector(".location-pin");
const buttonGroup = document.querySelectorAll(".main__group button");
const input = document.querySelector(".main input");
const btnSubmit = document.querySelector("#submit");

const searchSection = document.querySelector(".hero__container");
const inputSearch = document.querySelector(".hero__container input");
const searchPlaces = document.querySelector(".hero__nav .btn--search");
const searchBtn = document.querySelector(".hero__container .btn--search");

searchPlaces.addEventListener("click", () => {
  searchSection.classList.add("open");
});

searchBtn.addEventListener("click", () => {
  searchSection.classList.remove("open");
  const inputValue = inputSearch.value;
  getCityData(inputValue, unit);
  if (!days.innerHTML == "") {
    days.innerHTML = "";
    fiveDayForecastCity(inputValue, unit);
  }
});

btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  getCityData(inputValue, unit);
  fiveDayForecastCity(inputValue, unit);
  main.style.display = "none";
  body.classList.remove("is-open");
});

let unit;
buttonGroup.forEach((e) => {
  e.addEventListener("click", () => {
    e.classList.toggle("selected");
    unit = e.dataset["unit"];
  });
});

// Get data by your current location
getLocation.addEventListener("click", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude.toFixed();
      lat = position.coords.latitude.toFixed();
      getData(lat, long);
      if (!days.innerHTML == "") {
        days.innerHTML = "";
        fiveDayForecast(lat, long);
      }
    });
  } else {
    console.log("Failed to load data");
  }
});

async function getCityData(city, units) {
  const request = await fetch(`${API}/weather?q=${city}&units=${units}&appid=${APIKey}`);
  const response = await request.json();
  let data = response;
  populateData(data);
}

function populateData(data) {
  let location = data.name;
  let currentTemp = data.main.temp.toFixed();
  let weatherState = data.weather[0].main;
  let weatherIcon = data.weather[0].icon;

  const date = new Date();
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  let dayName = date.toString().split(" ")[0];
  const shortDate = `${dayName}, ${day} ${month}`;
  currentTemeprature(shortDate, currentTemp, weatherState, location, weatherIcon);

  // Other data
  let windSpeed = data.wind.speed.toFixed();
  let windDeg = data.wind.deg;
  let humidity = data.main.humidity;
  let airPressure = data.main.pressure;
  otherWeatherData(windSpeed, windDeg, humidity, airPressure);
}

async function getData(lat, long) {
  const request = await fetch(`${API}/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIKey}`);
  const response = await request.json();
  let data = response;
  populateData(data);
}

function currentTemeprature(date, currentTemp, weatherState, location, weatherIcon) {
  weather.innerHTML = `<div class="weather__state-icon">
        <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherState}">
      </div>
      <p class="weather__temperature">${currentTemp}<span>&#176;c</span></p>
      <p class="weather__state">${weatherState}</p>
      <div class="weather__about">
        <p>Today</p>
        <div class="decoration"></div>
        <p>${date}</p>
      </div>
      <div class="location">
        <img src="assets/icons/location.svg" alt="Location Pin">
        <p>${location}</p>
      </div>`;
}

function otherWeatherData(windSpeed, windDeg, humidity, airPressure) {
  highlight.innerHTML = `
  <h2>Today’s Hightlights</h2>
  <div class="highlight__card">
        <p class="highlight__data">Wind status</p>
        <p class="highlight__main">${windSpeed} <span>mph</span></p>
        <p>${windDeg} WSW</p>
      </div>

      <div class="highlight__card">
        <p class="highlight__data">Humidity</p>
        <p class="highlight__main">${humidity} <span>%</span></p>
        <div class="group">
          <div class="scale__label">
            <p>0</p>
            <p>50</p>
            <p>100</p>
          </div>
          <div class="scale">
            <div class="scale__line" style="width:${humidity}%;"></div>
          </div>
          <p class="scale__label scale__label--special">%</p>
        </div>
      </div>

      <div class="highlight__card">
        <p class="highlight__data">Visibility</p>
        <p class="highlight__main">6,4 <span>miles</span></p>
      </div>

      <div class="highlight__card">
        <p class="highlight__data">Air Pressure</p>
        <p class="highlight__main">${airPressure} <span>mb</span></p>
      </div>`;
}

async function fiveDayForecastCity(city, units) {
  const request = await fetch(`${API}/forecast?q=${city}&units=${units}&appid=${APIKey}`);
  const data = await request.json();

  const fiveDayData = [];
  for (let i = 0; i < data.list.length; i += 8) {
    const element = data.list[i];
    fiveDayData.push(element);
  }

  for (let i = 0; i < fiveDayData.length; i++) {
    let maxTemp = fiveDayData[i].main.temp_max.toFixed();
    let minTemp = fiveDayData[i].main.temp_min.toFixed();
    let icon = fiveDayData[i].weather[0].icon;
    let iconState = fiveDayData[i].weather[0].main;
    if (i === 0) {
      fiveDay("Today", maxTemp, minTemp, icon, iconState);
    } else if (i === 1) {
      fiveDay("Tomorrow", maxTemp, minTemp, icon, iconState);
    } else {
      const date = new Date();
      let numberOfDaysToAdd = i;
      date.setDate(date.getDate() + numberOfDaysToAdd);
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
      const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
      let dayName = date.toString().split(" ")[0];
      const shortDate = `${dayName}, ${day} ${month}`;
      fiveDay(shortDate, maxTemp, minTemp, icon, iconState);
    }
  }
}

async function fiveDayForecast(lat, long) {
  const request = await fetch(
    `${API}/forecast?lat=${lat}&lon=${long}&units=metric&appid=${APIKey}`
  );
  const data = await request.json();

  // Get every 8th element from the API
  const fiveDayData = [];
  for (let i = 0; i < data.list.length; i += 8) {
    const element = data.list[i];
    fiveDayData.push(element);
  }

  for (let i = 0; i < fiveDayData.length; i++) {
    let maxTemp = fiveDayData[i].main.temp_max.toFixed();
    let minTemp = fiveDayData[i].main.temp_min.toFixed();
    let icon = fiveDayData[i].weather[0].icon;
    let iconState = fiveDayData[i].weather[0].main;
    if (i === 0) {
      fiveDay("Today", maxTemp, minTemp, icon, iconState);
    } else if (i === 1) {
      fiveDay("Tomorrow", maxTemp, minTemp, icon, iconState);
    } else {
      const date = new Date();
      let numberOfDaysToAdd = i;
      date.setDate(date.getDate() + numberOfDaysToAdd);
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
      const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
      let dayName = date.toString().split(" ")[0];
      const shortDate = `${dayName}, ${day} ${month}`;
      fiveDay(shortDate, maxTemp, minTemp, icon, iconState);
    }
  }
}

function fiveDay(date, maxTemp, minTemp, icon, iconState) {
  days.innerHTML += `
      <div class="card">
        <p class="card__date">${date}</p>
        <div class="card__weather">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${iconState}">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
`;
}
