import React, { useState } from "react";
import { products } from "../../../data/products";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import { MdFavorite } from "react-icons/md";

const Profile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const {  toggleFavourite } = useFavourites();

  // Dummy favorite products (can be updated with actual user data)
  const favoriteProducts = products.slice(0, 3); // Take 3 sample products
  const [favoriteProductsList, setFavoriteProductsList] =
    useState(favoriteProducts);

  const removeFromFavorites = (id: string) => {
    toggleFavourite(id); // Remove from favorites in context
    setFavoriteProductsList((prev) => prev.filter((item) => item.id !== id)); // Remove from UI
  };

  // Separate state for toggling password visibility
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dummy orders with status
  const orderHistory = [
    { id: 1, items: 3, total: 59.99, status: "Completed" },
    { id: 2, items: 2, total: 29.99, status: "Ongoing" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (password === confirmPassword) {
      alert("Password changed successfully!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Main Grid: Profile Card, Orders, and Password */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-300">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  Upload Image
                </div>
              )}
            </div>
            <input
              type="file"
              className="mt-3 block mx-auto"
              onChange={handleImageUpload}
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-500">johndoe@email.com</p>
            <p className="text-gray-500">+1-123-456-7890</p>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-sm text-gray-500">SMS Alerts</span>
            <span className="text-green-500">● Active</span>
          </div>
          <button className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold">
            Save
          </button>
        </div>

        {/* Orders & Password Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Order History */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Order History</h3>
            <ul>
              {orderHistory.map((order) => (
                <li
                  key={order.id}
                  className="p-3 border rounded-lg mb-2 sm:flex justify-between items-center bg-gray-200 grid grid-cols-14"
                >
                  <span>
                    Order #{order.id} - {order.items} items
                  </span>
                  <span
                    className={`font-bold ${
                      order.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-medium">${order.total}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Change Password */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            {/* New Password Input */}
            <div className="flex items-center">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="border p-2 w-40 sm:w-11/12 rounded-lg mb-2 bg-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="ml-2 text-sm text-gray-600"
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Confirm Password Input */}
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="border p-2 w-40 sm:w-11/12  rounded-lg mb-2 bg-gray-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2  text-sm text-gray-600"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              onClick={handlePasswordChange}
              className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Dropdown Section at the Bottom */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <span className="text-lg font-semibold">Favorite Products</span>
          <button className="bg-[#d66161] text-white px-4 py-2 rounded-lg">
            {showFavorites ? "Hide" : "Show"}
          </button>
        </div>

        {/* Favorite Products List */}
        {showFavorites && (
          <div className="mt-4 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar-container">
            {favoriteProductsList.map((item) => (
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
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.brief}</p>
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="mt-2"
                  >
                    <MdFavorite className="text-red-500 text-3xl" />
                  </button>
                </div>
                <span className="font-medium">{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
