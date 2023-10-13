"use client";

import {
  faBagShopping,
  faGauge,
  faShoppingCart,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

import Card from "@/components/ui/card";
import Heading from "@/components/ui/heading";

const dashboardTabs = [
  {
    key: 0,
    name: "Dashboard",
    icon: faGauge,
    href: "/admin/dashboard/",
  },
  {
    key: 1,
    name: "Products",
    icon: faBagShopping,
    href: "/admin/dashboard/products",
  },
  {
    key: 2,
    name: "Users",
    icon: faUsers,
    href: "/admin/dashboard/users",
  },
  {
    key: 3,
    name: "Orders",
    icon: faShoppingCart,
    href: "/admin/dashboard/orders",
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(dashboardTabs[0]);

  return (
    <section className="px-5 sm:-mx-20 md:-mx-32 xl:-mx-[28rem] overflow-x-auto">
      <Heading size="lg">Admin Dashboard</Heading>
      <div className="flex flex-col sm:flex-row gap-5">
        <Card className="tabs flex flex-row sm:flex-col justify-around sm:justify-start items-start gap-10 w-full sm:w-fit ">
          {dashboardTabs.map((tab) => {
            return (
              <Link href={tab.href} key={tab.key}>
                <h5
                  className={`flex items-center gap-4 px-5 md:px-8 py-3 hover:bg-gray-200 rounded-xl opacity-80  cursor-pointer transition-all duration-200 ease-in-out ${
                    activeTab.name === tab.name
                      ? "bg-orange-3 opacity-100 hover:bg-orange-3"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <FontAwesomeIcon icon={tab.icon} className="text-orange" />
                  <span className="hidden md:inline-block">{tab.name}</span>
                </h5>
              </Link>
            );
          })}
        </Card>

        <Card className="w-full">{children}</Card>
      </div>
    </section>
  );
};

export default DashboardLayout;
