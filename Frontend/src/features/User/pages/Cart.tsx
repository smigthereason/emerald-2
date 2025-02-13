import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../Shared/hooks/CartContext";
import useCustomScrollbar from "../../../data/useCustomScrollbar";
import DeliveryLocation from "../components/DeliveryLocation";

const Cart = () => {
  const { cart, removeFromCart } = useCart(); // Get cart data
  const { containerRef, thumbRef } = useCustomScrollbar(); // Get ref for custom scrollbar
  const [phoneNumber, setPhoneNumber] = useState('');

  // New states for payment method and delivery location
  type PaymentMethod = "mpesa" | "airtelMoney";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [location] = useState("");

  // Calculate subtotal from cart items
  const subtotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.replace("$", "")),
    0
  );

  // For demonstration, we use a flat shipping cost if a location is provided
  const shippingCost = location.trim() !== "" ? 5.0 : 0;
  const total = subtotal + shippingCost;

  const paymentDetails = {
    mpesa: {
      paybill: "522522",
      accountNumber: "1337392618"
    },
    airtelMoney: {
      paybill: "333000",
      accountNumber: "BEAUTIQUE1"
    }
  };

  const handlePhoneNumberChange = (e: { target: { value: string; }; }) => {
    // Only allow numbers and limit to 12 characters
    const value = e.target.value.replace(/[^\d]/g, '');
    if (value.length <= 12) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="cart min-h-screen bg-white rounded-lg shadow-lg">
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
            <div className="relative">
              <div
                ref={containerRef}
                className="custom-scrollbar-container space-y-6 max-h-[500px]"
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="cart-item flex items-center space-x-4 bg-[#fff4f3] p-4 rounded-lg sm:h-[200px]"
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
                        className="text-red-500 text-sm mt-2 hover:transition-transform animate-pulse"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="font-medium relative right-0 sm:right-10">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
              {/* Custom Scrollbar Track */}
              <div className="custom-scrollbar-track">
                <div ref={thumbRef} className="custom-scrollbar-thumb"></div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="cart-total bg-[#fff4f3] p-6 rounded-lg">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="border-t border-black pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cart.length} items)
                    </span>
                    <span className="font-medium">€ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method Toggle */}
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-700">
                    Payment Method
                  </h2>

                  <div className="flex space-x-8 my-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        paymentMethod === "mpesa"
                          ? "bg-[#D8798F] text-white"
                          : "bg-white text-[#D8798F] border-[#D8798F]"
                      }`}
                    >
                      M-PESA
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("airtelMoney")}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        paymentMethod === "airtelMoney"
                          ? "bg-[#D8798F] text-white"
                          : "bg-white text-[#D8798F] border-[#D8798F]"
                      }`}
                    >
                      Airtel Money
                    </button>
                  </div>

                  {paymentMethod && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Paybill Number
                          </p>
                          <p className="mt-1 text-lg font-semibold">
                            {paymentDetails[paymentMethod].paybill}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Account Number
                          </p>
                          <p className="mt-1 text-lg font-semibold">
                            {paymentDetails[paymentMethod].accountNumber}
                          </p>
                        </div>

                        <div className="pt-4">
                          <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm your{" "}
                            {paymentMethod === "mpesa"
                              ? "M-PESA"
                              : "Airtel Money"}{" "}
                            number
                          </label>
                          <div className="mt-1">
                            <input
                              type="tel"
                              id="phoneNumber"
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
                              placeholder="Enter phone number"
                              className="bg-white w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8798F] focus:border-transparent"
                              maxLength={12}
                            />
                          </div>
                          <p className=" mt-2 text-sm text-gray-500">
                            Please enter your phone number in the format:
                            254XXXXXXXXX
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Location */}
                {/* <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-700">
                    Delivery Location
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-2 w-full p-2 border rounded"
                  />
                </div> */}

                {/* Shipping Cost */}
                {/* <div className="mt-6 flex justify-between">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="font-medium">
                    € {shippingCost.toFixed(2)}
                  </span>
                </div> */}

                <DeliveryLocation />

                {/* Total */}
                <div className="mt-4 flex justify-between border-t pt-4">
                  <span className="text-gray-600">Total</span>
                  <span className="font-medium">€ {total.toFixed(2)}</span>
                </div>

                <button className="w-full bg-white border border-[#D8798F] text-[#D8798F] py-3 rounded-lg hover:bg-[#D8798F] hover:text-white transition-colors mt-6">
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
