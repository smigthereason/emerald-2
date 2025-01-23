import { Link } from 'react-router-dom';

const Offers = () => {
  return (
    <div className="relative h-96 mb-8">
    <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-40 bg-black" />
      <img
        className="w-full h-full object-cover backdrop-filter backdrop-blur-lg"
        src="src/assets/Images/sale.jpg"
        alt="hero1"
      />
       <div className="absolute z-[0] w-[100%] h-[100%] right-0 top-0 bg-black/50" />

      <Link to="/" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center border-8 h-64 w-4/5">
        <h1 className="text-2xl font-medium mt-6">NEW COLLECTION</h1>
        <span className="text-6xl font-bold mt-6">25% OFF</span>
        <div className="space-x-4 relative top-4">
          <p className="absolute left-20 text-m font-normal mt-6 w-4/5">For a limited time only, enjoy 25% OFF on selected items in our exclusive collection. From stylish shirts to trendy jeans, elegant dresses, and must-have heels, there's something for everyone.</p>
        </div>
      </Link>
    </div>
  );
};

export default Offers;