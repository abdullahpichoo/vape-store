import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NavSearch = () => {
  return (
    <div className="search-bar relative z-20 w-full">
      <input
        type="text"
        className="w-full ps-16 md:ps-20 py-4 rounded-xl bg-transparent text-[1.2rem] sm:text-[1.4rem] md:text-[1.6rem]"
        placeholder="Search for products..."
      />

      <FontAwesomeIcon
        icon={faSearch}
        className="w-5 md:w-8 absolute top-[50%] left-8 -translate-y-[50%] text-grey"
      />
    </div>
  );
};

export default NavSearch;
