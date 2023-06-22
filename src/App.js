import React, { useState, useEffect } from 'react';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherReport from "./components/WeatherReport/WeathersReport";
import WeatherForecast from "./components/WeatherDesc/WeatherForecast";
import "./styles/global.scss";
import {
  WEATHER_API_KEY,
  CURRENT_WEATHER_URL,
  FORECAST_WEATHER_URL,
} from "./utils/api";

function App() {
  const [currentWeathers, setCurrentWeathers] = useState(null);
  const [forecast, setForecast] = useState(null);
  // const [city, //setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleSearchChange = (searchData) => {
    setSearchValue(searchData);
    console.log(searchData);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      let url;
      let forecastUrl;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //Setting latitude and longitude
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log(latitude,longitude);
            //fetchWeatherData(); // Fetch weather data once location is available
          },
          (error) => {
            console.log(error);
            //fetchWeatherData(); // Fetch weather data even if location permission is denied
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
       // fetchWeatherData(); // Fetch weather data even if geolocation is not supported
      }

      // Fetching weather data based on search value or user's location
      if (searchValue && searchValue.trim() !== "") {
        url = `${CURRENT_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
        forecastUrl = `${FORECAST_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
      } else if (latitude && longitude) {
        forecastUrl = `${FORECAST_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
        url = `${CURRENT_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
      } else {
        // If neither location nor search value is available, show default page or handle as desired
        console.log("n")
        setCurrentWeathers([]);
        setForecast([]);
        return
      }

      try {
        const weatherResponse = await fetch(url);
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          // Handle invalid city or error response
          setForecast([]);
          //setCity("");
          return;
        }
        if (!weatherResponse.ok) {
          // Handle invalid city or error response
          setCurrentWeathers([]);
          //setCity("");
          return;
        }
        const report = await weatherResponse.json();
        const forecastreport = await forecastResponse.json();
        setCurrentWeathers(report);
        setForecast(forecastreport);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle error
        setCurrentWeathers([]);
        setForecast([]);
        //setCity("");
      }
    };

    fetchWeatherData();
  }, [searchValue, latitude, longitude]);

  useEffect(() => {
    // Log the currentWeathers and forecast values after they are updated
    console.log("currentWeathers:", currentWeathers);
    console.log("forecast:", forecast);
  }, [currentWeathers, forecast]);

  return (
    <>
      <Navbar onSearchChange={handleSearchChange} />
    {currentWeathers && <WeatherReport data={currentWeathers} />}
      {forecast && <WeatherForecast data={forecast} />}
    </>
  );
}

export default App;
