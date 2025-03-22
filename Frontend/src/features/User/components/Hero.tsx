// import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-96 rounded-lg">
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-40 bg-black rounded-lg" />
      <img
        className="w-full h-full object-cover rounded-lg backdrop-filter backdrop-blur-lg"
        src="/assets/bg-images/hero1.jpg"
        alt="hero1"
      />
      <div className="absolute z-[0] w-[100%] h-[100%] right-0 top-0 bg-black/50" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          EMERALD FASHION COLLECTION 2025
        </h1>

        {/* <div className="relative top-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center sm:items-start">
          <Link
            to="/spring"
            className=" w-3/6 sm:w-full border border-white hover:bg-black/50 text-white font-bold py-2 px-4 rounded inline-block transform transition duration-300 hover:scale-110"
          >
            SPRING
          </Link>
          <Link
            to="/summer"
            className="w-3/6 sm:w-full border border-white hover:bg-black/50 text-white font-bold py-2 px-4 rounded inline-block transform transition duration-300 hover:scale-110"
          >
            SUMMER
          </Link>
          <Link
            to="/winter"
            className="w-3/6 sm:w-full border border-white hover:bg-black/50 text-white font-bold py-2 px-4 rounded inline-block transform transition duration-300 hover:scale-110"
          >
            WINTER
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
