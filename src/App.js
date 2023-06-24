import React, { useState, useEffect } from "react";
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
import WeatherIcon from "./components/WeatherDefaultIcon/WeatherIcon";

function App() {
  const [currentWeathers, setCurrentWeathers] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLocationOrCityAvailable, setIsLocationOrCityAvailable] =
    useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageDesc, setErrorMessageDesc] = useState("");

  const handleSearchChange = (searchData) => {
    setSearchValue(searchData);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      let url;
      let forecastUrl;

      try {
        if (searchValue && searchValue.trim() !== "") {
          url = `${CURRENT_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
          forecastUrl = `${FORECAST_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
        } else {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          forecastUrl = `${FORECAST_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
          url = `${CURRENT_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
        }

        const weatherResponse = await fetch(url);
        const forecastResponse = await fetch(forecastUrl);

        if (!forecastResponse.ok || !weatherResponse.ok) {
          setIsLocationOrCityAvailable(false);
          setErrorMessage("City not found");
          setErrorMessageDesc("Please enter correct city name.");
          setForecast(null);
          setCurrentWeathers(null);
          return;
        }

        const report = await weatherResponse.json();
        const forecastreport = await forecastResponse.json();

        setCurrentWeathers(report);
        setForecast(forecastreport);
        setIsLocationOrCityAvailable(true);
        setErrorMessage(""); // Reset the error message if successful
        setErrorMessageDesc("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setIsLocationOrCityAvailable(false);
        setCurrentWeathers(null);
        setForecast(null);
        setErrorMessage("Detecting your location");
        setErrorMessageDesc(
          "Your location will be used for real-time weather."
        );
      }
    };

    fetchWeatherData();
  }, [searchValue]);

  return (
    <>
      <div className="container-fluid px-0">
        <Navbar onSearchChange={handleSearchChange} />
        {/* {errorMessage && <div>{errorMessage}</div>} */}
        {!isLocationOrCityAvailable && (
          <WeatherIcon
            errorMessage={errorMessage}
            errorMessageDesc={errorMessageDesc}
          />
        )}
        <div className="row bg mx-0 px-0">
          <div className="col-sm-12 col-md-12 col-lg-6 mx-0 px-0">
            {currentWeathers && <WeatherReport data={currentWeathers} />}
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6  mx-0 px-0">
            {forecast && <WeatherForecast data={forecast} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
