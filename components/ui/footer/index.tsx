import Img from "../image";
import Dot from "../nav/dot";

const Footer = () => {
  return (
    <footer className="w-full bg-black px-16 py-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
        <Img
          src="/assets/logo.svg"
          alt="elite wholesale logo"
          className="w-[20rem] md:w-[30rem]"
        />
        <div className="dots gap-4 hidden md:flex">
          <Dot size="bg" />
          <Dot size="bg" />
        </div>

        <div className="footer-details text-white font-hind flex justify-center gap-5 md:gap-20 text-[1.6rem] md:text-[1.8rem]">
          <ul className="company-details text-[1.5rem]">
            <li className="font-bold mb-3 text-[1.7rem]">Company</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
          </ul>

          <ul className="features-details text-[1.5rem]">
            <li className="font-bold mb-3 text-[1.7rem]">Features</li>
            <li>Products</li>
            <li>Brands</li>
            <li>My Account</li>
          </ul>
        </div>
      </div>
      <div className="my-8 w-full content-[''] h-[1px] bg-white text-white" />
      <div className="flex justify-between text-white">
        <p className="text-[1rem] sm:text-[1.6rem] text-white">
          @2023 Elite Wholesale. All Right Reserved
        </p>
        <p className="text-[1rem] sm:text-[1.6rem] text-white">000-000-000</p>
      </div>
    </footer>
  );
};

export default Footer;
