import React from "react";

export default function WeatherForecast() {
  return (
    <div>
      <div>
        <div className={`${css.weather_card}`} id="weather_card">
          <div className={css.dayTime}>
            {/* City name */}
            <span className={css.days}>{weathers[0]?.name}</span>
            {/* Time */}
            <span className={css.time}>{formattedTime}</span>
          </div>
          <div className={`${css.weather_detail}`} id="weather_Detail">
            <div className={css.leftSection}>
              {/* Temperature */}
              <div className={css.temp}>
                <span>{Math.round(weathers[0]?.main.temp)} °C</span>
              </div>
              {/* Weather Icon */}
              <div className={css.weatherIcon}>
                <WeatherIcon icon={weathers[0]?.weather[0]?.icon} />
                {/* Weather Description */}
                <p className={css.description}>
                  {weathers[0]?.weather[0]?.description}
                </p>
              </div>
            </div>
            <div className={css.rightSection}>
              <div>
                {/* Real feel temperature */}
                <div>
                  <span className={css.details}>Real Feel :</span>
                  <span className={css.content}>
                    {Math.round(weathers[0]?.main.feels_like)} °C
                  </span>
                </div>
                {/* Wind speed */}
                <div>
                  <span className={css.details}>Wind :,</span>
                  <span className={css.content}>
                    {weathers[0]?.wind.speed} km/h
                  </span>
                </div>
                {/* Pressure */}
                <div>
                  <span className={css.details}>Pressure :</span>
                  <span className={css.content}>
                    {weathers[0]?.main.pressure} MB
                  </span>
                </div>
                {/* Humidity */}
                <div>
                  <span className={css.details}>Humidity :</span>
                  <span className={css.content}>
                    {weathers[0]?.main.humidity}%
                  </span>
                </div>
              </div>
              <div>
                {/* Sunrise */}
                <div>
                  <span className={css.details}>Sunrise :</span>
                  <span className={css.content}>
                    {convertTo12HourFormat(weathers[0]?.sys.sunrise)}
                  </span>
                </div>
                {/* Sunset */}
                <div>
                  <span className={css.details}>Sunset :</span>
                  <span className={css.content}>
                    {convertTo12HourFormat(weathers[0]?.sys.sunset)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
