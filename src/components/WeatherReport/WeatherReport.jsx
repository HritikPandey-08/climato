import React, { useState, useEffect } from "react";
import css from "./WeatherReport.module.scss";
import { imagePath } from "../../utils/iconsPath";

function WeatherReport() {
  const [weathers, setWeathers] = useState([]);

  const convertMpsToKph = (metersPerSecond) => {
    const kilometersPerHour = Math.round(metersPerSecond * 3.6);
    const lowerRange = kilometersPerHour;
    const upperRange = kilometersPerHour + 1;
    return `${lowerRange} - ${upperRange}`;
  };

  const convertTo12HourFormat = (time24) => {
    let [hours, minutes] = time24.split(':');
    let period = 'AM';

    hours = parseInt(hours);

    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${hours}:${minutes} ${period}`;
  };

  const WeatherIcon = ({ icon }) => {
    const iconPath = imagePath + `${icon}.png`;
    return <img src={iconPath} alt={icon} />;
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

 
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      let url;
      if (latitude && longitude) {
        url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=a8ab053d1bca453a92305d8ab32c48aa&include=minutely`;
      }
      if (searchValue!='')
      {
        url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
      }
  
      try {
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
      
        let report = await response.json();
        console.log(report); // Log the response data to check its content
        setWeathers(report.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
      console.log(Array.isArray(weathers))
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
      fetchWeatherData();
  },[latitude, longitude]);


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
        {weathers && weathers.length > 0 ? (
          weathers.map((item, index) => (
            <div key={index}>
              <div className={`${css.weather_card}`} id="weather_card">
            <div className={css.dayTime}>
              <span className={css.days}>{item.city_name}</span>
              <span className={css.time}>11:42 PM</span>
            </div>
            <div className={`${css.weather_detail}`} id="weather_Detail">
              <div className={css.leftSection}>
                <div className={css.temp}>
                  <span>{Math.round(item.temp)}</span>
                </div>
                <div className={css.weatherIcon}>
                  <WeatherIcon icon={item.weather.icon}/>
                  <p className={css.description}>{item.weather.description}</p>
                </div>
              </div>
              <div className={css.rightSection}>
                <div>
                  <div>
                    <span className={css.details}>Real Feel :</span>
                    <span className={css.content}>{}</span>
                  </div>
                  <div>
                    <span className={css.details}>Wind :{item.wind_cdir},</span>
                    <span className={css.content}>{convertMpsToKph(item.wind_spd)} km/h</span>
                  </div>
                  <div>
                    <span className={css.details}>Pressure :</span>
                    <span className={css.content}>{item.pres} MB</span>
                  </div>
                  <div>
                    <span className={css.details}>Humidity :</span>
                    <span className={css.content}>{item.rh}%</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className={css.details}>Sunrise :</span>
                    <span className={css.content}>{convertTo12HourFormat(item.sunrise)}</span>
                  </div>
                  <div>
                    <span className={css.details}>Sunset :</span>
                    <span className={css.content}>{convertTo12HourFormat(item.sunset)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default WeatherReport;
