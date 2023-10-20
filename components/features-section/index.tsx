import {
  faBasketShopping,
  faHeadset,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const features = [
  {
    title: "Priority Shipping",
    desc: "Priority shipping on all orders.",
    icon: faTruckFast,
  },
  {
    title: "Customer Service",
    desc: "You will be assigned a personal sales rep.",
    icon: faHeadset,
  },
  {
    title: "No Minimum Order",
    desc: "Get just what you need everytime.",
    icon: faBasketShopping,
  },
  {
    title: "Genuine Products",
    desc: "We carry only authentic products form the industry leaders.",
    icon: faStar,
  },
];

const Features = () => {
  return (
    <section className="grid grid-cols-12 gap-5 bg-light-blue -mx-5 sm:-mx-24 md:-mx-36 xl:-mx-[30rem] px-5 sm:px-24 md:px-36 py-5">
      {features.map((feature, i) => {
        return (
          <div
            className="col-span-6 lg:col-span-3 feature flex flex-col sm:flex-row text-center sm:text-left gap-2 sm:gap-5 items-center"
            key={i}
          >
            <div className="feature-icon text-[5.5rem]">
              <FontAwesomeIcon icon={feature.icon} />
            </div>
            <div className="feature-text">
              <h4 className="uppercase font-extrabold">{feature.title}</h4>
              <p className="leading-tight">{feature.desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Features;
