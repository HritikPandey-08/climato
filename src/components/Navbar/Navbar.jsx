import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faThLarge,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import css from "./Navbar.module.scss";
import "../../styles/toggleButton.css";
function Navbar({onSearchChange}) {

  const [search , setSearch] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  // handling on change event of search bar
  const handleOnChange = (event) => {
    const searchData = event.target.value;
    setSearch(searchData);
  
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  
    // Set a new timeout to delay the search
    const newTimeoutId = setTimeout(() => {
      onSearchChange(searchData);
    }, 600); // Adjust the delay time as needed (e.g., 700 milliseconds)
  
    setTimeoutId(newTimeoutId);
  };
  

  return (
    <div className="container-fluid">
      <div className={`${css.header} padding`}>
        <div className={css.leftSide}>
          <div className="menu">
            <span className={css.icons}>
              <FontAwesomeIcon icon={faThLarge} />
            </span>
          </div>
          <div className="notification ">
            <span className={`${css.icons} ${css.rounded}`}>
              <FontAwesomeIcon icon={faBell} />
            </span>
          </div>

          <div className={`${css.location}`}>
            <span className={`${css.locationIcons} `}>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <div className={css.locationName}>
              <span className={css.cityName}>Mumbai, </span>
              <span className={css.countryName}>India</span>
            </div>
          </div>
        </div>
        <div className={css.center}>
          {/* Search bar */}
          <div className="searchbar">
            <form className="d-flex" role="search">
              <input
                className={css.roundedInput}
                type="search"
                value={search}
                onChange={handleOnChange}
                placeholder="Search city.."
                aria-label="Search"
              />
            {/* Search bar icon */}
              <button className={css.roundedIcon}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
          </div>
        </div>

        <div className={css.rightSide}>
          {/* Dark light mode toggle button */}
          <div className="mode">
            <span className="px-2 text-white">
              <label id="switch" className="switch">
                <input type="checkbox" id="slider" />
                <span className="slider round"></span>
              </label>
            </span>
          </div>
          {/* user icon */}
          <div className={css.user_account}>
            <img src="./user.gif" alt="User" className="rounded-circle" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
