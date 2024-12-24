import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import WeatherData from './WeatherData';
import LoadingSpinner from './LoadingSpinner';

const Dashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const apiKey = 'befd984de4d3c050671d4eb935e6c660'; 

  useEffect(() => {
    // Add or remove the dark-mode class on the body tag
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    // Cleanup to avoid any issues
    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  const fetchWeatherData = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null)
    } finally {
        setLoading(false);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  console.log('Loading state:', loading);

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
    <div className="container weather-card">

      <h1>Weather Dashboard</h1>  
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control" 
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" id="searchBtn" onClick={fetchWeatherData}>Get Weather</button>

        <button className="btn btn-primary" onClick={handleDarkModeToggle}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      </div>

      
      {/* {loading && <LoadingSpinner />} */}
      {loading && <LoadingSpinner />}

      {error && <div className="error-message">{error}</div>}
           
      {weatherData && !loading && (
        <WeatherData data={weatherData} />
      )}
    </div>
  );
};


export default Dashboard