import Image from "next/image";
import Link from "next/link";

import Dot from "./dot";
import NavSearch from "./nav-search";

const navClasses = {
  container: "py-",
  logo: "w-80",
  nav: "flex justify-between items-center",
  navItem: "mx-4 text-white font-bold",
};

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-black px-12 py-6">
      <Link href={"/"}>
        <div className="logo-container w-80">
          <Image
            src="/assets/logo.svg"
            alt="elite wholesale logo"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </Link>

      <div className="dot-container flex justify-center items-center gap-3">
        <Dot size="bg" />
        <Dot size="sm" />
      </div>

      <NavSearch />
    </nav>
  );
};

export default NavBar;
