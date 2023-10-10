interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: "orange" | "black";
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { variant } = props;
  return (
    <button
      {...props}
      className={`btn relative z-20 bg-orange-1 text-black shadow-[5px_10px_0px_rgba(62, 62, 62)] px-24 py-4 w-fit font-bold hover:bg-orange-2 transition-all duration-200 ease-in ${props.className}`}
    >
      <span className="uppercase">{props.children}</span>
    </button>
  );
};

export default Button;
