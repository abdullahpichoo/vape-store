import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import Img from "@/components/ui/image";

import BrowseItems from "./browse-items";
import CartBtn from "./cartBtn";
import Dot from "./dot";
import NavSearch from "./nav-search";

const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between items-center bg-black px-16 py-8">
        <Link href={"/"}>
          <Img src="/assets/logo.svg" alt="elite wholesale logo" width="80" />
        </Link>

        <div className="dot-container flex-center gap-3">
          <Dot size="bg" />
          <Dot size="sm" />
        </div>

        <NavSearch />

        <div className="dot-container flex-center gap-3">
          <Dot size="sm" />
          <Dot size="bg" />
        </div>

        <div className="flex-center gap-10">
          <CartBtn />
          <div className="account-cta text-white flex-center gap-3">
            <FontAwesomeIcon icon={faUser} className="w-7" />
            <h6>My Account</h6>
          </div>
        </div>
      </nav>
      <BrowseItems />
    </>
  );
};

export default NavBar;
