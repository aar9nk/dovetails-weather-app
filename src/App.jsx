import Card from "./components/Card";
import { useState } from "react";

// Set appId
const appId = "APP_ID";

// getDataForCity function that fetches weather info from openweathermap api
const fetchApi = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&units=metric`
  );
  const data = response.json();
  return data;
};

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

const App = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // get the city from the input field
    const city = input;
    const resultFromApi = await fetchApi(city);
    const name = resultFromApi.name;
    const emoji = emojis[resultFromApi.weather[0].icon];
    const temp = resultFromApi.main.temp;
    const feelsLike = resultFromApi.main.feels_like;
    const description = resultFromApi.weather[0].description;

    setWeather({
      name: name,
      emoji: emoji,
      temp: temp,
      feelsLike: feelsLike,
      description: description,
    });
    setInput("");
  };

  return (
    <div>
      <h1>What is the Weather</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="city-input">In</label>
        <input
          id="city-input"
          type="text"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <button id="go-button" type="submit">
          Go!
        </button>
      </form>
      <div id="weather-container">
        {/* Render the component conditionally if there is data in the weather state */}
        {weather && <Card weather={weather} />}
      </div>
    </div>
  );
};

export default App;
