import Img from "../ui/image";

const HeroSection = () => {
  return (
    <header className="sm:-mx-20 md:-mx-32 xl:-mx-[28rem] rounded-t-3xl rounded-b-3xl overflow-hidden">
      <div className="grid grid-rows-6 grid-cols-12 gap-5 w-full">
        <div className="col-span-12 lg:col-span-8 row-span-6 lg:row-span-6">
          <Img
            src="/assets/hero-section/slider-images/slider-1.webp"
            alt="ORION BAR 7500 PUFF DISPOSABLE LOST VAPE"
            className="w-full"
          />
        </div>
        <div className="row-span-6 lg:row-span-3 col-span-12 sm:col-span-6 lg:col-span-4">
          <video className="w-full h-full object-cover" loop autoPlay>
            <source src="/assets/hero-section/right-section/Icewave-580X290 Compressed.mp4" />
          </video>
        </div>
        <div className="row-span-6 lg:row-span-3 col-span-12 sm:col-span-6 lg:col-span-4">
          <video className="w-full h-full object-cover" loop autoPlay>
            <source src="/assets/hero-section/right-section/Raz Tn9000 - 580-290.mp4" />
          </video>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;