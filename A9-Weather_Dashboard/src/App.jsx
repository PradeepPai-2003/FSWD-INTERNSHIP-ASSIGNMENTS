import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "8c25df1cfdab45635a0510c4123560c2";

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("cloud")) return "☁️";
    if (desc.includes("rain")) return "🌧️";
    if (desc.includes("clear")) return "☀️";
    if (desc.includes("sunny")) return "🌞";
    if (desc.includes("snow")) return "❄️";
    if (desc.includes("storm")) return "⛈️";
    if (desc.includes("mist")) return "🌫️";
    return "🌤️";
  };

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setStatus("Please enter a city!");
      return;
    }

    setLoading(true);
    setStatus("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!res.ok) {
        throw new Error("City not found! Please try another city.");
      }

      const data = await res.json();
      setWeather(data);
      setStatus("");
    } catch (err) {
      setStatus(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <div className="weather-container">
        <div className="header">
          <div className="logo-section">
            <span className="logo-icon">🌤️</span>
          </div>
          <h1>WeatherPulse</h1>
          <p className="subtitle">Your Real-Time Weather Companion</p>
        </div>

        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button 
              onClick={fetchWeather} 
              disabled={loading}
              className="search-btn"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {status && (
          <div className={`status ${status.includes("not found") ? "error" : "info"}`}>
            {status}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <p className="weather-desc">{weather.weather[0].description}</p>
            </div>

            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weather.weather[0].description)}
              </div>
              <div className="temperature">
                <span className="temp-value">{Math.round(weather.main.temp)}°C</span>
                <span className="feels-like">Feels like {Math.round(weather.main.feels_like)}°C</span>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-icon">💧</span>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">💨</span>
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🌡️</span>
                <span className="detail-label">Max Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_max)}°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">❄️</span>
                <span className="detail-label">Min Temp</span>
                <span className="detail-value">{Math.round(weather.main.temp_min)}°C</span>
              </div>
            </div>

            <div className="weather-extra">
              <div className="extra-item">
                <span>Pressure</span>
                <span className="extra-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="extra-item">
                <span>Visibility</span>
                <span className="extra-value">{(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;