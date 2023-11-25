"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { brands } from "@/contants/product/brands";
import { categories } from "@/contants/product/categories";

type DropdownItems = {
  label: string;
  value: string;
};

type Dropdown = {
  label: string;
  items: DropdownItems[];
};

const BrowseItems = () => {
  const router = useRouter();
  return (
    <>
      <div className="hidden browse-items-by w-full px-5 py-2 bg-orange-1 lg:flex justify-around relative">
        <HoverCard openDelay={150} closeDelay={100}>
          <HoverCardTrigger
            onClick={() => {
              router.push("/product/shop-by-products", { scroll: false });
            }}
            className="cursor-pointer"
          >
            <div className="shop-by flex-center gap-3">
              <FontAwesomeIcon icon={faChevronDown} className="w-8" />
              <h6 className="uppercase text-[1.3rem]">Shop By Products</h6>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-[40vw] px-20 py-5">
            <h5 className="uppercase">Categories</h5>
            <div className="dropdown-items grid grid-cols-2 py-2">
              {categories.map((item) => (
                <div key={item.value} className="col-span-1 dropdown-item p-2">
                  <Link href={"#"}>
                    <h6 className="uppercase font-medium text-gray-800">
                      {item.label}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard openDelay={150} closeDelay={100}>
          <HoverCardTrigger
            onClick={() => {
              router.push("#", { scroll: false });
            }}
            className="cursor-pointer"
          >
            <div className="shop-by flex-center gap-3">
              <FontAwesomeIcon icon={faChevronDown} className="w-8" />
              <h6 className="uppercase text-[1.3rem]">Shop By Brands</h6>
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-[40vw] px-20 py-5">
            <h5 className="uppercase">Brands</h5>
            <div className="dropdown-items grid grid-cols-2 py-2">
              {brands.map((item) => (
                <div key={item.value} className="col-span-1 dropdown-item p-2">
                  <Link href={"#"}>
                    <h6 className="uppercase font-medium text-gray-800">
                      {item.label}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
};

export default BrowseItems;
