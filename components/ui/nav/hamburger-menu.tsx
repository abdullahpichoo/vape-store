"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const HamburgerMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="hamburger-menu lg:hidden">
      <FontAwesomeIcon
        icon={faBars}
        className="text-[3rem] text-white cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />
      <div
        role="button"
        className={`backdrop absolute top-0 left-0 z-30 w-[100vw] h-[100vh] bg-black opacity-50 ease-in-out duration-300 transition-all ${
          drawerOpen ? "block" : "hidden"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      <div
        className={`top-0 right-0 w-[60vw] md:w-[40vw] bg-white px-20 py-14 text-white fixed h-full z-40 ease-in-out duration-300 transition-all transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-start">
          <FontAwesomeIcon
            icon={faClose}
            className="text-[3rem] text-black cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-5 mt-16">
          <Link href={"/"} onClick={() => setDrawerOpen(false)}>
            <h4 className="uppercase">Shop By Products</h4>
          </Link>
          <Link href={"/"} onClick={() => setDrawerOpen(false)}>
            <h4 className="uppercase">Shop By Brands</h4>
          </Link>
          <Link href={"/account"} onClick={() => setDrawerOpen(false)}>
            <h4 className="uppercase">My Account</h4>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
