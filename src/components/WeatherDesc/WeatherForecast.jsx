import React from "react";
import css from "./WeatherDesc.module.scss";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { imagePath } from "../../utils/iconsPath";

function WeatherForecast({data}) {
  // const [expanded, setExpanded] = useState(false);

  // const handleCardClick = () => {
  //   setExpanded(!expanded);
  // };

  const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // const WeatherIcon = ({ icon }) => {
  //   const iconPath = `${imagePath}${icon}.png`;
  //   return <img src={iconPath} alt={icon} />;
  // };

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
    {data && data.list && (
      <div className={css.forecastReport}>
         <Accordion>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={css.daily_item}>
                  <img src={`${imagePath}`+`${item.weather[0].icon}.png`} className={css.icon_small} alt="weather" />
                  <label className={css.day}>{forecastDays[idx]}</label>
                  <label className={css.description}>{item.weather[0].description}</label>
                  <label className={css.min_max}>{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className={css.daily_details_grid}>
                <div className={css.daily_details_grid_item}>
                  <label>Pressure:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className={css.daily_details_grid_item}>
                  <label>Humidity:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className={css.daily_details_grid_item}>
                  <label>Clouds:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className={css.daily_details_grid_item}>
                  <label>Wind speed:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className={css.daily_details_grid_item}>
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className={css.daily_details_grid_item}>
                  <label>Feels like:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>

      </div>
       
    )}
    </>
  );
}

export default WeatherForecast;
