import React from "react";

const dashboardTabs = [
  {
    key: 1,
    name: "Products",
    href: "/dashboard/products",
    component: false,
  },
  {
    key: 2,
    name: "Retailers",
    href: "/dashboard/customers",
    component: false,
  },
  {
    key: 3,
    name: "Orders",
    href: "/dashboard/orders",
    component: false,
  },
];

const DashboardTabs = () => {
  return <div>DashboardTabs</div>;
};

export default DashboardTabs;
