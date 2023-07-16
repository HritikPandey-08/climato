import React, {useRef } from "react";
import css from "./WeatherReport.module.scss";
import { imagePath } from "../../utils/iconsPath";

function WeatherReport({ data }) {
  
  // Icon for weather
  const WeatherIcon = ({ icon }) => {
    const iconPath = `${imagePath}${icon}.png`;
    return <img src={iconPath} alt={icon} />;
  };
  
  
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

   const formattedTime = timeRef.current.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div className={`${css.container} padding`}>
      <div className={css.lowerSection}>
        {/* Weather card */}
        { data && data.main ? 
        (
          <div>
            <div className={`${css.weather_card}`} id="weather_card">
              <div className={css.dayTime}>
                {/* City name */}
                <span className={css.days}>{data.name}</span>
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
