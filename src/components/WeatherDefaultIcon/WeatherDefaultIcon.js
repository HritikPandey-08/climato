import React from "react";
import "./WeatherIcon.css"

function WeatherIcon({ icon, label }) {
  let iconContent = null;

  switch (icon) {
    case "sunny":
      iconContent = (
        <div icon={icon} data-label={label}>
          <span className="sun"></span>
        </div>
      );
      break;
    case "cloudy":
      iconContent = (
        <div icon={icon} data-label={label}>
          <span className="cloud"></span>
          <span className="cloud"></span>
        </div>
      );
      break;
    case "snowy":
      iconContent = (
        <div icon={icon} data-label={label}>
          <span className="snowman"></span>
          <ul>
            {Array.from({ length: 13 }, (_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
      );
      break;
    case "stormy":
      iconContent = (
        <div icon={icon} data-label={label}>
          <span className="cloud"></span>
          <ul>
            {Array.from({ length: 5 }, (_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
      );
      break;
    case "supermoon":
      iconContent = (
        <div icon={icon} data-label={label}>
          <span className="moon"></span>
          <span className="meteor"></span>
        </div>
      );
      break;
    default:
      iconContent = null;
  }

  return iconContent;
}

export default WeatherIcon;
