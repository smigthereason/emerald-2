import { useState } from "react";
import useCustomScrollbar from "../../../data/useCustomScrollbar";

const Payment = () => {
  useCustomScrollbar();
  const [phoneNumber, setPhoneNumber] = useState("");

  type PaymentMethod = "mpesa" | "airtelMoney";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");

  // Helper function to parse price string to number

  // Format number with thousands separator and KSH prefix

  const paymentDetails = {
    mpesa: {
      paybill: "522522",
      accountNumber: "1337392618",
    },
    airtelMoney: {
      paybill: "333000",
      accountNumber: "BEAUTIQUE1",
    },
  };

  const handlePhoneNumberChange = (e: { target: { value: string } }) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    if (value.length <= 12) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="">
      {/* Payment Method Section */}
      <div className="mt-6">
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700">Payment Method</h2>

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
            <div className="pay mt-6 p-4 border rounded-lg bg-[#fff4f3]">
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
                    {paymentMethod === "mpesa" ? "M-PESA" : "Airtel Money"}{" "}
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
                  <p className="mt-2 text-sm text-gray-500">
                    Please enter your phone number in the format: 254XXXXXXXXX
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
