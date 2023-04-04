const api = {
  key: "2fa73590fd8b5a4c6e68098ad5625395",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  if ( weather_el.innerText == "Thunderstorm" || weather_el.innerText == "Clouds") {
    document.body.style.background=" no-repeat center/100% url('https://img.freepik.com/free-photo/weather-effects-composition_23-2149853313.jpg?w=740&t=st=1680598723~exp=1680599323~hmac=0f1f0f717343008b5b3ac60f33fb894bc52c72f5e7edd626b93e87649e88bcd4')";
    console.log("Clouds");
  } else if( weather_el.innerText == "Rain" || weather_el.innerText == "Drizzle") {
    document.body.style.background=" no-repeat center/100% url('https://img.freepik.com/free-photo/rain-outside-windows-villa_1321-908.jpg?w=740&t=st=1680599712~exp=1680600312~hmac=2559c2baffa6272d882231894433bce74443f88e47e4ddeb2475483d854c660e')";
    
    console.log("Rain");
  } else if( weather_el.innerText == "Snow") {
    document.body.style.background=" no-repeat center/100% url('https://img.freepik.com/free-photo/3d-snowy-winter-landscape_1048-11056.jpg?w=740&t=st=1680599775~exp=1680600375~hmac=8925fee91d82c5fea893e27886265dd06e1912fc22e5d1d3dd84bccf45b887dc')";
    
    console.log("Snow");
  }
// console.log(weather.weather[0].main);
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
}

function dateBuilder(d) {
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
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
