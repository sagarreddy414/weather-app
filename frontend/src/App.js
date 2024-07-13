import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchData(latitude, longitude);
      },
      (err) => {
        setError("Error getting location. Please enable location services.");
        setLoading(false);
      }
    );
  }, []);

  const fetchData = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(`http://localhost:8000/api/weather/?lat=${lat}&lon=${lon}`);
      const airQualityResponse = await axios.get(`http://localhost:8000/api/air-quality/?lat=${lat}&lon=${lon}`);
      
      setWeather(weatherResponse.data);
      setAirQuality(airQualityResponse.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="App">
      <h1>Local Weather and Air Quality Dashboard</h1>
      {weather && (
        <div className="weather-info">
          <h2>Weather</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Conditions: {weather.weather[0].description}</p>
        </div>
      )}
      {airQuality && (
        <div className="air-quality-info">
          <h2>Air Quality</h2>
          <p>AQI: {airQuality.data.aqi}</p>
          <p>Status: {getAQIStatus(airQuality.data.aqi)}</p>
        </div>
      )}
    </div>
  );
}

function getAQIStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export default App;