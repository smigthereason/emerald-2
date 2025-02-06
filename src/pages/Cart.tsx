// import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { Link } from 'react-router-dom';


const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Bustier, Calvin Klein Underwear',
      color: 'sonata',
      size: 'S',
      price: 24.45,
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Bikini-top, Tommy Hilfiger',
      color: 'navy blazer',
      size: 'S',
      price: 39.95,
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Short tights, Nike Performance',
      color: 'thunder gray',
      size: 'S',
      price: 29.95,
      image: '/api/placeholder/80/80'
    }
  ];

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="flex items-center text-pink-400">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-700">Shopping cart</h1>
              <span className="text-pink-400">3 items</span>
            </div>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-[#fff4f3] p-4 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Color: {item.color}, size {item.size}</p>
                    <div className="flex items-center mt-2">
                      <select className="text-sm border rounded px-2 py-1">
                        <option>Qty. 1</option>
                        <option>Qty. 2</option>
                        <option>Qty. 3</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">€ {item.price}</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#fff4f3] p-6 rounded-lg">
              <div className="space-y-4">
               

                <div className=" pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Payment method</h3>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Credit Card</p>
                  <p className="text-gray-600">•••• •••• •••• 5057</p>
                  <button className="text-pink-400 text-sm mt-2">Edit</button>
                </div>

                <div className="border-t border-black pt-4">
                  <h3 className="font-medium mb-2">Do you have any discount code?</h3>
                  <p className="text-gray-500 text-sm mb-2">Only one discount code per order can be applied.</p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
                    <input 
                      type="text" 
                      placeholder="Your code here"
                      className="flex-1 border rounded px-3 py-2 text-sm bg-white"
                    />
                    <button className="bg-[#D8798F] text-white px-4 py-2 rounded text-sm">
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="border-t border-black pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal (3 items)</span>
                    <span className="font-medium">€ 94,35</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping costs</span>
                    <span className="text-green-600">FREE!</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-black">
                    <span className="text-gray-600">Total (incl. VAT)</span>
                    <span className="text-xl font-medium">€ 94,35</span>
                  </div>
                </div>

                <button className="w-full bg-[#D8798F] text-white py-3 rounded-lg hover:bg-pink-500 transition-colors">
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;