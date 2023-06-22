import React from "react";
import css from "./WeatherDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { imagePath } from "../../utils/iconsPath";

function WeatherDetail() {
  //IMAGE PATH
  const WeatherIcon = ({ icon }) => {
    const iconPath = imagePath + `${icon}.png`;
    return <img src={iconPath} alt={icon} />;
  };
  return (
    <div className="wrapper padding">
      <div className={`${css.container} w-25"}`}>
        <div className={`${css.searchBar} form-group has-search`}>
          <button className={css.roundedIcon} type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input
            className={css.roundedInput}
            type="search"
            placeholder="Search for places..."
            aria-label="Search"
          />
        </div>
        <div className={css.weatherImage}>
          <WeatherIcon icon={"c04d"} />
        </div>
        <div className={css.weatherInfo}>
          <span className={css.temp}>12 C</span>
          <div className={css.dayTime}>
            <span>Monday,</span>
            <span>12:00 AM</span>
          </div>
          <hr />
          <div className={css.currentWeather}>
            <div className={css.weatherData}>
              <WeatherIcon icon={"cloudy"} />
              <span>Mostly Cloudy</span>
            </div>
            <div className={css.weatherData}> 
            <WeatherIcon icon={"rain"} />
              <span>Rain - 32%</span>
            </div>
          </div>
        </div>
        <div className="cityName">
          <span>India</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
