import { useState } from "react";
import DeliveryLocation from "./DeliveryLocation";
import Payment from "./Payment";

interface CartSummaryProps {
  cart: { id: string; price: string }[]; // Define the structure of cart items
  subtotal: number;
  total: number;
//   cart: CartItem[];
//   subtotal: number;
  shippingCost: number;
//   total: number;
}

const CartSummary = ({ cart, subtotal, total }: CartSummaryProps) => {
  const [shippingCost, setShippingCost] = useState(0);
  const [, setLocation] = useState("");

  // Format number with thousands separator and KSH prefix
  const formatKSH = (amount: number): string => {
    if (isNaN(amount)) return "KSH 0";
    return `KSH ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  // Handle shipping cost changes
  const handleShippingCostChange = (cost: number): void => {
    setShippingCost(cost);
  };

  // Handle location changes and update shipping cost
  const handleLocationChange = (newLocation: string): void => {
    setLocation(newLocation);
    const newShippingCost = newLocation.trim() !== "" ? 500 : 0;
    setShippingCost(newShippingCost);
  };

  return (
    <div className="cart-total bg-[#fff4f3] p-6 rounded-lg h-full">
      <div className="space-y-4 h-full flex flex-col justify-between">
        <div>
          <div className="border-b border-black pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Subtotal ({cart.length} items)
              </span>
              <span className="font-medium">{formatKSH(subtotal)}</span>
            </div>
          </div>

          {/* Payment Method Section */}
          <Payment />

          {/* Delivery Location Section */}
          <DeliveryLocation
            onShippingCostChange={handleShippingCostChange}
            onLocationChange={handleLocationChange}
          />
        </div>

        <div>
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="text-gray-600">Total</span>
            <span className="font-medium">
              {formatKSH(total + shippingCost)}
            </span>
          </div>

          <button className="w-full bg-white border border-[#D8798F] text-[#D8798F] py-3 rounded-lg hover:bg-[#D8798F] hover:text-white transition-colors mt-6">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
