interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "orange" | "black";
  size: "sm" | "md";
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { variant, size, disabled } = props;
  const btnSize =
    size && size === "sm"
      ? "text-[1rem] md:text-[1.2rem]"
      : "text-[1.6rem] md:text-[1.8rem] lg:text-[2rem]";

  return (
    <button
      {...props}
      className={`btn relative z-20 ${
        variant === "orange"
          ? "bg-orange-1 text-black hover:bg-orange-2"
          : "bg-black text-white hover:bg-grey"
      }
      ${disabled && "opacity-60 cursor-not-allowed "}
      px-24 py-4 w-fit font-bold transition-all duration-150 ease-in-out ${btnSize} ${
        props.className
      }`}
      style={{
        boxShadow:
          variant === "orange"
            ? "5px 5px 0px 0px rgba(62,62,62)"
            : "5px 5px 0px 0px rgba(244,145,53)",
      }}
    >
      <span className="uppercase">{props.children}</span>
    </button>
  );
};

export default Button;
