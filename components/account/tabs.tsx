"use client";

import {
  faAddressBook,
  faClockRotateLeft,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Card from "@/components/ui/card";

import AddressBook from "./address-book";
import AccountDetails from "./details";
import OrderHistory from "./order-history";

const accountTabs = [
  {
    name: "My Details",
    icon: faUserCircle,
    component: <AccountDetails />,
  },
  {
    name: "Address Book",
    icon: faAddressBook,
    component: <AddressBook />,
  },
  {
    name: "Order History",
    icon: faClockRotateLeft,
    component: <OrderHistory />,
  },
];

export default function AccountTabs() {
  const [activeTab, setActiveTab] = useState({
    name: "My Details",
    icon: faUserCircle,
    component: <AccountDetails />,
  });

  return (
    <div className="flex flex-col gap-10">
      <Card className="h-full w-full">
        <div className="flex justify-around gap-3 md:gap-8">
          {accountTabs.map((tab) => {
            return (
              <h5
                key={tab.name}
                className={`flex items-center gap-4 px-2 md:px-8 py-2 hover:bg-gray-200 rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
                  activeTab.name === tab.name
                    ? "bg-orange-3 hover:bg-orange-3"
                    : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.name}</span>
              </h5>
            );
          })}
        </div>
      </Card>
      <Card>{activeTab.component}</Card>
    </div>
  );
}
