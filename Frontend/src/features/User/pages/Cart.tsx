import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../Shared/hooks/CartContext";
// import CustomScrollbar from "../components/CustomScrollbarContainer";
import useCustomScrollbar from "../../../data/useCustomScrollbar";

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart data
  const { containerRef, thumbRef } = useCustomScrollbar(); // Get ref for custom scrollbar

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
              <h1 className="text-2xl font-semibold text-gray-700">
                Shopping cart
              </h1>
              <span className="text-pink-400">{cart.length} items</span>
            </div>

            {/* Scrollable container for cart items */}
            {/* <CustomScrollbar> */}
            <div className="relative">
              <div
                ref={containerRef}
                className="custom-scrollbar-container space-y-6 max-h-[500px]"
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-[#fff4f3] p-4 rounded-lg sm:h-[200px]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-44 h-44 object-contain rounded-3xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{item.brief}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm mt-2 hover:transition-transform animate-pulse "
                      >
                        Remove
                      </button>
                    </div>
                    <span className="font-medium relative right-0 sm:right-10">{item.price}</span>
                  </div>
                ))}
              </div>
              {/* Custom Scrollbar Track */}
              <div className="custom-scrollbar-track">
                <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
              </div>
            </div>
            {/* </CustomScrollbar> */}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#fff4f3] p-6 rounded-lg">
              <div className="space-y-4">
                <div className="border-t border-black pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cart.length} items)
                    </span>
                    <span className="font-medium">
                      €{" "}
                      {cart
                        .reduce(
                          (total, item) =>
                            total + parseFloat(item.price.replace("$", "")),
                          0
                        )
                        .toFixed(2)}
                    </span>
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
