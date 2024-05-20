// Set appId
const appId = "APP_ID";

// getDataForCity function that fetches weather info from openweathermap api
const getDataForCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&units=metric`
  );
  const data = response.json();
  return data;
};

// createCardHtml function used to render the weather info
const createCardHtml = (name, emoji, temp, feelsLike, description) => `
<div>
  <div>${emoji}</div>
  <div>
    <h4>${name}</h4>
    <h6>
     ${temp}c, feels like ${feelsLike}c
    </h6>
    <h5>${description}</h5>
  </div>
</div>
`;

// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
  "01d": "☀️",
  "02d": "⛅️",
  "03d": "☁️",
  "04d": "☁️",
  "09d": "🌧",
  "10d": "🌦",
  "11d": "⛈",
  "13d": "❄️",
  "50d": "💨",
  "01n": "☀️",
  "02n": "⛅️",
  "03n": "☁️",
  "04n": "☁️",
  "09n": "🌧",
  "10n": "🌦",
  "11n": "⛈",
  "13n": "❄️",
  "50n": "💨",
};

// selecting all the things needed
const goButton = document.querySelector("#go-button");
const cityInput = document.querySelector("#city-input");
const weatherContainer = document.querySelector("#weather-container");

// event listener for a click event on the "Go!" button
goButton.addEventListener("click", async () => {
  // get the city from the input field
  const city = cityInput.value;

  // get the weather data for the city
  const data = await getDataForCity(city);
  // get the data we need for our html from the response
  const name = data.name;
  const emoji = emojis[data.weather[0].icon];
  const temp = data.main.temp;
  const feelsLike = data.main.feels_like;
  const description = data.weather[0].description;

  // create the card html
  const cardHtml = createCardHtml(name, emoji, temp, feelsLike, description);

  // render!
  weatherContainer.innerHTML = cardHtml;
});
