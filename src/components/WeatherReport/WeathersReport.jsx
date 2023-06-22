import React, {useRef } from "react";
import css from "./WeatherReport.module.scss";
import { imagePath } from "../../utils/iconsPath";
// import {
//   WEATHER_API_KEY,
//   CURRENT_WEATHER_URL,
//   FORECAST_WEATHER_URL,
// } from "../../utils/api";

function WeatherReport({ data }) {
  console.log("current weather value",data);
  // const [data, setdata] = useState([]);
  // const [forecast, setforecast] = useState([]);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  // const [time, setTime] = useState(new Date());
  // const [city, setCity] = useState("");

  // Icon for weather
  const WeatherIcon = ({ icon }) => {
    const iconPath = `${imagePath}${icon}.png`;
    return <img src={iconPath} alt={icon} />;
  };
  
  // const dayInAWeek = new Date().getDay();


  const timeRef = useRef(new Date());
  const convertTo12HourFormat = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const time12hr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    return time12hr;
  };

  // useEffect(() => {

  //   const fetchWeatherData = async () => {
  //     let url;
  //     let forecastUrl;
  //     // Getting current location from user
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         //Setting latitude and longitude
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         fetchWeatherData(); // Fetch weather data once location is available
  //       },
  //       (error) => {
  //         console.log(error);
  //         fetchWeatherData(); // Fetch weather data even if location permission is denied
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //     fetchWeatherData(); // Fetch weather data even if geolocation is not supported
  //   }
  //     //checking is user allowed location or not
  //     if (searchValue && searchValue.trim() !== "") {
  //       url = `${CURRENT_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
  //       forecastUrl = `${FORECAST_WEATHER_URL}q=${searchValue}&units=metric&appid=${WEATHER_API_KEY}`;
  //     } else if (latitude && longitude) {
  //       forecastUrl = `${FORECAST_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
  //       url = `${CURRENT_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`;
  //     }
  //     // checking searchbar data is empty or not
  //     else {
  //       // If neither location nor search value is available, show default page or handle as desired
  //       setdata([]);
  //       setCity("");
  //       return;
  //     }

  //     try {
  //       const weatherResponse = await fetch(url);
  //       const forecastResponse = await fetch(forecastUrl);
  //       if (!weatherResponse.ok) {
  //         // Handle invalid city or error response
  //         setdata([]);
  //         setCity("");
  //         return;
  //       }
  //       const report = await weatherResponse.json();
  //       setdata([report]);
  //       setCity(report?.name);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //       // Handle error
  //       setdata([]);
  //       setCity("");
  //     }
  //   };
  //   fetchWeatherData();    
  //   //Timer (Digital clock)
  //   const intervalID = setInterval(() => {
  //     timeRef.current = new Date();
  //     setTime(timeRef.current); // Update the state to trigger re-render
  //   }, 1000);
  //   return () => clearInterval(intervalID);
  // }, [searchValue, latitude, longitude]);

  const formattedTime = timeRef.current.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });


  return (
    <div className={`${css.container} padding`}>
      <div className={css.upperSection}>
        <div className={css.days}>
          <span>Today</span>
          <span>Tomorrow</span>
          <span>Next 7 days</span>
        </div>
      </div>
      <div className={css.lowerSection}>
        {/* Weather card */}
        { data && data.main && data.weather && data.weather[0]  ? 
        (
          <div>
            <div className={`${css.weather_card}`} id="weather_card">
              <div className={css.dayTime}>
                {/* City name */}
                <span className={css.days}>{data.name}</span>
                <span className={css.days}>{data.city}</span>
                {/* Time */}
                <span className={css.time}>{formattedTime}</span>
              </div>
              <div className={`${css.weather_detail}`} id="weather_Detail">
                <div className={css.leftSection}>
                  {/* Temperature */}
                  <div className={css.temp}>
                    <span>{Math.round(data.main.temp)} °C</span>
                  </div>
                  {/* Weather Icon */}
                  <div className={css.weatherIcon}>
                    <WeatherIcon icon={data.weather[0].icon} />
                    {/* Weather Description */}
                    <p className={css.description}>
                      {data.weather[0].description}
                    </p>
                  </div>
                </div>
                <div className={css.rightSection}>
                  <div>
                    {/* Real feel temperature */}
                    <div>
                      <span className={css.details}>Real Feel :</span>
                      <span className={css.content}>
                        {Math.round(data.main.feels_like)} °C
                      </span>
                    </div>
                    {/* Wind speed */}
                    <div>
                      <span className={css.details}>Wind :,</span>
                      <span className={css.content}>
                        {data.wind.speed} km/h
                      </span>
                    </div>
                    {/* Pressure */}
                    <div>
                      <span className={css.details}>Pressure :</span>
                      <span className={css.content}>
                        {data.main.pressure} MB
                      </span>
                    </div>
                    {/* Humidity */}
                    <div>
                      <span className={css.details}>Humidity :</span>
                      <span className={css.content}>
                        {data.main.humidity}%
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* Sunrise */}
                    <div>
                      <span className={css.details}>Sunrise :</span>
                      <span className={css.content}>
                        {convertTo12HourFormat(data.sys.sunrise)}
                      </span>
                    </div>
                    {/* Sunset */}
                    <div>
                      <span className={css.details}>Sunset :</span>
                      <span className={css.content}>
                        {convertTo12HourFormat(data.sys.sunset)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // If data is not available deafult message
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherReport;
