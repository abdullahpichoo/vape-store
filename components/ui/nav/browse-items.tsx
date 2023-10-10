import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const BrowseItems = () => {
  return (
    <>
      <div className="browse-items-by w-full bg-orange-1 flex justify-around">
        <Link href={"/"}>
          <div className="shop-by px-5 py-2 flex-center gap-3">
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h5>Shop By Brands</h5>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="shop-by px-5 py-2 flex-center gap-3">
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h5>Shop By Products</h5>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BrowseItems;
