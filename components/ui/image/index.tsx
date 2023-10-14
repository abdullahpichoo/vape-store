import Image from "next/image";

const Img = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) => {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="50vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Img;
