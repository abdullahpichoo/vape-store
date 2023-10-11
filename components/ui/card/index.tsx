interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  const { children, className } = props;
  return (
    <div
      className={`bg-slate-100 px-10 py-6 rounded-2xl drop-shadow ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
