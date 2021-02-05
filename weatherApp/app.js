const weather = document.querySelector(".weather");
const highlight = document.querySelector(".highlight");
const days = document.querySelector(".days");

const APIKey = "fb9db9ad6093d8f55168df2067c8b839";
let API = "https://api.openweathermap.org/data/2.5/";
window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude.toFixed();
      lat = position.coords.latitude.toFixed();
      // getData(lat, long);
      // fiveDayForecast(lat, long);
    });
  } else {
    console.log("Try search by a city instead");
  }
});

async function getData(lat, long) {
  const request = await fetch(`${API}/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIKey}`);
  const response = await request.json();
  let data = response;

  let location = data.name;
  let currentTemp = data.main.temp.toFixed();
  let weatherState = data.weather[0].main;
  let weatherIcon = data.weather[0].icon;
  currentTemeprature(currentTemp, weatherState, location, weatherIcon);

  // Other data
  let windSpeed = data.wind.speed.toFixed();
  let windDeg = data.wind.deg;
  let humidity = data.main.humidity;
  let airPressure = data.main.pressure;
  otherWeatherData(windSpeed, windDeg, humidity, airPressure);
}

function currentTemeprature(currentTemp, weatherState, location, weatherIcon) {
  weather.innerHTML = `<div class="weather__state-icon">
        <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherState}">
      </div>
      <p class="weather__temperature">${currentTemp}<span>&#176;c</span></p>
      <p class="weather__state">${weatherState}</p>
      <div class="weather__about">
        <p>Today</p>
        <div class="decoration"></div>
        <p>Fri, 5 Jun</p>
      </div>
      <div class="location">
        <img src="assets/icons/location.svg" alt="Location Pin">
        <p>${location}</p>
      </div>`;
}

function otherWeatherData(windSpeed, windDeg, humidity, airPressure) {
  highlight.innerHTML = `
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

async function fiveDayForecast(lat, long) {
  const request = await fetch(
    `${API}/forecast?lat=${lat}&lon=${long}&units=metric&appid=${APIKey}`
  );
  const data = await request.json();
  console.log(data);
  // This is still not working, loop is needed
  let maxTemp = data.list[0].main.temp_max.toFixed();
  let minTemp = data.list[0].main.temp_min.toFixed();
  let icon = data.list[0].weather[0].icon;
  let iconState = data.list[0].weather[0].main;
  fiveDay(maxTemp, minTemp, icon, iconState);
}

function fiveDay(maxTemp, minTemp, icon, iconState) {
  days.innerHTML = `
      <div class="card">
        <p class="card__date">Today</p>
        <div class="card__weather">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${iconState}">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
      <div class="card">
        <p class="card__date">Tomorrow</p>
        <div class="card__weather">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
      <div class="card">
        <p class="card__date">Today</p>
        <div class="card__weather">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
      <div class="card">
        <p class="card__date">Today</p>
        <div class="card__weather">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
      <div class="card">
        <p class="card__date">Today</p>
        <div class="card__weather">
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        </div>
        <div class="card__temperature">
          <p class="temp__max">${maxTemp}<span>&#176;c</span></p>
          <p class="temp__min">${minTemp}<span>&#176;c</span></p>
        </div>
      </div>
`;
}
