"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

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
  const [dropdownItems, setDropdownItems] = useState<null | Dropdown>(null);

  return (
    <>
      <div className="hidden browse-items-by w-full px-5 py-2 bg-orange-1 lg:flex justify-around relative">
        <Link href={"/"}>
          <div
            className="shop-by flex-center gap-3"
            onMouseEnter={() => {
              setDropdownItems({
                label: "categories",
                items: categories,
              });
            }}
            role="button"
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h6 className="uppercase text-[1.3rem]">Shop By Products</h6>
          </div>
        </Link>
        <Link href={"/"}>
          <div
            className="shop-by flex-center gap-3"
            onMouseEnter={() => {
              setDropdownItems({
                label: "brands",
                items: brands,
              });
            }}
            role="button"
          >
            <FontAwesomeIcon icon={faChevronDown} className="w-8" />
            <h6 className="uppercase text-[1.3rem]">Shop By Brands</h6>
          </div>
        </Link>
        {dropdownItems && (
          <div
            className={`absolute z-50 w-[50%] top-12 ${
              dropdownItems?.label === "brands" ? "right-0" : "left-0"
            }  bg-orange-100 px-20 py-5 rounded-b-2xl`}
            onMouseLeave={() => setDropdownItems(null)}
          >
            <h5 className="uppercase">{dropdownItems?.label}</h5>
            <div className="dropdown-items grid grid-cols-2 py-2">
              {dropdownItems?.items?.map((item) => (
                <div key={item.value} className="col-span-1 dropdown-item p-2">
                  <Link href={"#"}>
                    <h6 className="uppercase font-medium text-gray-800">
                      {item.label}
                    </h6>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BrowseItems;
