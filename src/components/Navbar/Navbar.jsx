import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import css from "./Navbar.module.scss";
import "../../styles/toggleButton.css";
function Navbar({ onSearchChange }) {
  const [search, setSearch] = useState("");
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
    }, 600); // Adjust the delay time as needed (e.g., 600 milliseconds)

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className={`${css.header} py-3 px-4`}>
      <div className={css.center}>
        {/* Search bar */}
        <div className="searchbar">
          <input
            className={css.roundedInput}
            type="search"
            value={search}
            onChange={handleOnChange}
            placeholder="Search city.."
            aria-label="Search"
          />
          {/* Search bar icon */}
          {search === "" && (
            <button className={css.roundedIcon}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-2" />
            </button>
          )}
        </div>
      </div>

      {/* <div className={css.rightSide}>
        {/* Dark light mode toggle button */}
        {/* <div className="mode">
          <span className="px-2 text-white">
            <label id="switch" className="switch">
              <input type="checkbox" id="slider" />
              <span className="slider round"></span>
            </label>
          </span>
        </div>
      </div> */} 
    </div>
  );
}

export default Navbar;
