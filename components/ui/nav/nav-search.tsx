import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const NavSearch = () => {
  return (
    <div className="search-bar relative z-20 w-[50rem]">
      <input
        type="text"
        className="w-full ps-20 py-4 rounded-xl bg-transparent"
        placeholder="Search for products..."
      />

      <FontAwesomeIcon
        icon={faSearch}
        className="w-8 absolute top-[50%] left-8 -translate-y-[50%] text-grey"
      />
    </div>
  );
};

export default NavSearch;
