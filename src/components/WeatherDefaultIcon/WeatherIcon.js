import React from "react";
import css from "./WeatherIcon.module.scss";
import { imagePath } from "../../utils/path";

function WeatherIcon(props) {
  return (
    <div className={css.default_message}>
      <div className={css.bgImage}>
        <div className={css.icons}>
          <img src={imagePath+`weatherIcons.gif`} alt="icon" />
        </div>
        <div className={css.message}>
          <h3>{props.errorMessage}</h3>
          <span>
           {props.errorMessageDesc}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeatherIcon;
