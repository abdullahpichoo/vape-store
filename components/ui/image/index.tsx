import Image from "next/image";

const Img = ({
  src,
  alt,
  width,
}: {
  width: string;
  src: string;
  alt: string;
}) => {
  return (
    <div className={`logo-container w-${width}`}>
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Img;
