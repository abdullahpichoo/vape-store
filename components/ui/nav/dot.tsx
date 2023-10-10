import React from "react";

const Dot = ({ size }: { size: "bg" | "sm" }) => {
  return size === "bg" ? (
    <div className="bg-orange-1 w-5 h-5 rounded-full"></div>
  ) : (
    <div className="bg-orange-1 w-4 h-4 rounded-full"></div>
  );
};

export default Dot;
