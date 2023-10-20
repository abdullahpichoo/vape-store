import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BrowseItems = () => {
  return (
    <>
      <div className="hidden browse-items-by w-full px-5 py-2 bg-orange-1 lg:flex justify-around">
        <Link href={"/"}>
          <div className="shop-by flex-center gap-3">
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h6 className="uppercase text-[1.3rem]">Shop By Products</h6>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="shop-by flex-center gap-3">
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h6 className="uppercase text-[1.3rem]">Shop By Brands</h6>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BrowseItems;
