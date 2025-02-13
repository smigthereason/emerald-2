import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TypedJS from "../components/TypedJS";
import Title from "../components/Title";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const categories = ["Welcome to Emerald."];

  return (
    <div
      id="abt"
      className="flex flex-col items-center justify-center min-h-screen min-w-full"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      {/* Hero Section */}
      <div className="relative sm:w-full  h-[300px] sm:h-[600px] mx-auto">
        <img
          className="w-full h-full object-cover"
          src="src/assets/bg-images/about1.jpg"
          alt="About Emerald"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 font-beau">
            <TypedJS strings={categories} />
          </h1>
        </div>
      </div>

      {/* Additional Section */}
      <div
        className="relative w-full h-[600px] mx-auto mt-20 flex"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        {/* Left Image Section */}
        <div className="hidden sm:inline relative w-2/6 h-full rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src="src/assets/bg-images/about2.jpg"
            alt="About Emerald"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Right Text Section */}
        <div className="w-full sm:w-3/6 flex flex-col justify-center p-10 relative sm:left-32 left-2 -top-20 sm:top-0 sm:text-center">
        <Title highlightText="Our" mainText="Story" />
          <p className="text-gray-600 mt-4 max-w-full">
            Emerald Fashion was born out of a love for fashion, sustainability,
            and individuality. We believe that looking good shouldn’t come at
            the cost of the environment or your wallet. That’s why we’ve created
            a curated online thrift store where you can discover unique,
            pre-loved pieces that tell a story and help you express your
            personal style.
          </p>
        </div>
      </div>

      <div className="flex justify-center -mt-12 sm:mt-12">
        <div className="border-b-2 border-black/40 w-32 sm:w-60 -rotate-45 "></div>
      </div>

      {/* Additional Section 2 */}
      <div
        className="relative w-full max-w-6xl h-[600px] mx-auto mt-20 flex"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {/* left Text Section */}
        <div className=" w-full sm:w-3/6 flex flex-col justify-center p-10 relative -top-40 sm:top-0">
        <Title highlightText="Why Thrift" mainText="With Us?" />

          <ul className="relative sm:list-disc sm:list-inside list-none  mt-4 text-gray-700  sm:text-left left-0">
            <li>
              <em >Unique Finds</em>
            </li>
            <li>
              <em>Affordable Style</em>
            </li>
            <li>
              <em>Sustainable Shopping</em>
            </li>
            <li>
              <em>Inclusive Sizing</em>
            </li>
          </ul>
        </div>
        {/* Right Image Section */}
        <div className="hidden sm:inline relative left-48 w-2/6 h-full rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover "
            src="src/assets/bg-images/about3.jpg"
            alt="About Emerald"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      <div className="flex justify-center -mt-12 sm:mt-12 relative -top-56 sm:top-0">
        <div className="border-b-2 border-black/40 w-32 sm:w-60 rotate-45 "></div>
      </div>

      {/* Additional Section 3 */}

      <div
        className="relative -top-28 sm:top-0 w-full h-[600px] mx-auto flex justify-center items-center"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="w-full sm:w-3/6 flex flex-col justify-center items-center p-10 text-center">
        <Title highlightText="Join the" mainText="Glow-Up Movement" />

          <p className="text-gray-600 mt-4 text-center">
            At Emerald Fashion, we’re not just selling clothes—we’re helping you
            transform your wardrobe and your confidence. Every purchase you make
            is a step toward a more sustainable future and a more stylish you.
            <br />
            <span className="font-bold relative top-10">
              Ready to glow up? Start thrifting today and discover the magic of
              Emerald Fashion!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
