import React from "react";

interface HeadingProps {
  size: "xl" | "lg" | "md";
  children: React.ReactNode;
}
const Heading = (props: HeadingProps) => {
  const { children, size } = props;

  const headingSize =
    size === "xl"
      ? "text-[4.2rem] md:text-[4.8rem] lg:text-[5.2rem]"
      : size === "lg"
      ? "text-[3.4rem] md:text-[3.8rem] lg:text-[4.2rem]"
      : size === "md"
      ? "text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem]"
      : "";

  return (
    <h1
      className={`heading relative w-fit uppercase font-extrabold mb-5 ${headingSize}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
