interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  const { children, className } = props;
  return (
    <div
      className={`bg-neutral-50 border-2 border-neutral-100 px-5 md:px-10 py-6 rounded-2xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
