import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="bg-white overflow-hidden border">
        <img
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p2.jpg"
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
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p2.jpg"
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
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p3.jpg"
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
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p2.jpg"
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
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p2.jpg"
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
          className="w-full h-[400px] object-contain"
          src="src/assets/Images/p2.jpg"
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
  );
};

export default Products;
