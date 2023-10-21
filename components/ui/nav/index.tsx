import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import Img from "@/components/ui/image";
import Providers from "@/providers";

import BrowseItems from "./browse-items";
import CartBtn from "./cart-btn";
import Dot from "./dot";
import HamburgerMenu from "./hamburger-menu";
import NavSearch from "./nav-search";

const NavBar = () => {
  return (
    <>
      <Providers>
        <nav className="bg-black px-16 py-8">
          <div className="flex justify-between items-center gap-10">
            <Link href={"/"}>
              <Img
                src="/assets/logo.svg"
                alt="elite wholesale logo"
                className="w-52 lg:w-80"
              />
            </Link>

            <div className="dot-container hidden lg:flex justify-center items-center gap-3 ">
              <Dot size="bg" />
              <Dot size="sm" />
            </div>

            <div className="hidden md:block w-full lg:w-[50rem]">
              <NavSearch />
            </div>

            <div className="dot-container hidden lg:flex justify-center items-center gap-3 ">
              <Dot size="sm" />
              <Dot size="bg" />
            </div>

            <div className="hidden lg:flex justify-center items-center gap-10">
              <CartBtn />
              <Link href={"/account"}>
                <div className="account-cta flex flex-col gap-1.5">
                  <div className="text-white flex-center gap-3">
                    <FontAwesomeIcon icon={faUser} className="w-6" />
                    <h6 className="text-white">My Account</h6>
                  </div>
                </div>
              </Link>
            </div>

            <HamburgerMenu />
          </div>
          <div className="md:hidden mt-8">
            <NavSearch />
          </div>
        </nav>
        <BrowseItems />
      </Providers>
    </>
  );
};

export default NavBar;
