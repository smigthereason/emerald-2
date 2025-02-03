import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div className="py-8">
    {/* Title Section */}
    <h2 className="text-center text-2xl font-light mb-4">
      <span className="text-black font-bold">featured </span>items
    </h2>
    <div className="flex justify-center mb-6">
      <div className="border-b-2 border-black w-16 "></div>
    </div>
    <div className="grid grid-cols-3 gap-8 mt-8">
      
      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p5.jpeg"
          alt="Product 1"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 1</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product1"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p4.jpeg"
          alt="Product 2"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 2</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product2"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p6.jpeg"
          alt="Product 3"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 3</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product3"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p7.jpeg"
          alt="Product 1"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 1</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product1"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p13.jpeg"
          alt="Product 1"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 1</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product1"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain mt-8"
          src="src/assets/Images/p12.jpeg"
          alt="Product 1"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">Product 1</h3>
          <p className="text-gray-500 mb-4">A brief title</p>
          <div className="flex flex-col justify-between items-center space-y-4">
            <span className="text-2xl font-bold">$99</span>
            <Link
              to="/product1"
              className="bg-black text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  );
};

export default Products;
