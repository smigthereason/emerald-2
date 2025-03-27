
// import React, { useState, useEffect } from "react";
// // import { MdFavorite } from "react-icons/md";
// import axios from "axios";
// import { useAuth } from "../../../Shared/hooks/AuthContext";

// interface Product {
//   id: string;
//   title: string;
//   price: string;
//   image: string;
// }

// interface Order {
//   id: number;
//   total_price: number;
//   status: string;
//   created_at: string;
//   items: {
//     product_id: string;
//     quantity: number;
//   }[];
// }

// const Profile: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [profileData, setProfileData] = useState({
//     username: "",
//     email: "",
//     image: "",
//   });
//   const [password, setPassword] = useState({
//     current: "",
//     new: "",
//     confirm: "",
//   });
//   const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         interface ProfileResponse {
//           user: {
//             username: string;
//             email: string;
//             image: string;
//           };
//           favorites: Product[];
//           orders: Order[];
//         }

//         const response = await axios.get<ProfileResponse>("http://127.0.0.1:5000/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setProfileData({
//           username: response.data.user.username,
//           email: response.data.user.email,
//           image: response.data.user.image,
//         });
//         setFavoriteProducts(response.data.favorites);
//         setOrders(response.data.orders);
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setError("Failed to fetch profile data");
//       }
//     };

//     fetchProfileData();
//   }, []);

//   // In Profile.tsx
//   const handleImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       const formData = new FormData();
//       formData.append("image", file);

//       try {
//         const response = await axios.post<{ image_url: string }>("http://127.0.0.1:5000/profile/image", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         // Update local state
//         setProfileData((prev) => ({
//           ...prev,
//           image: response.data.image_url,
//         }));

//         // Update auth context if needed (assuming your auth context has a way to update user)
//         // You might need to add this functionality to your AuthContext
//         updateUser({ ...user, image: response.data.image_url });

//         setSuccess("Profile image updated successfully");
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setError("Failed to upload image");
//       }
//     }
//   };

//   const handleProfileUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put("/api/profile/update", profileData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setSuccess("Profile updated successfully");
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (err) {
//       setError("Failed to update profile");
//     }
//   };

//   const handlePasswordChange = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (password.new !== password.confirm) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       await axios.put(
//         "http://127.0.0.1:5000/profile/password",
//         {
//           current_password: password.current,
//           new_password: password.new,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       setSuccess("Password changed successfully");
//       setPassword({ current: "", new: "", confirm: "" });
//     } catch (err) {
//       if ((err as AxiosError)?.response?.data?.error) {
//         setError(err.response.data.error);
//       } else {
//         setError("Failed to change password");
//       }
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       {/* Main Grid: Profile Card, Orders, and Password */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Profile Card */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <div className="text-center">
//             <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-300">
//               {profileData.image ? (
//                 <img
//                   src={profileData.image}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
//                   Upload Image
//                 </div>
//               )}
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               className="mt-3 block mx-auto"
//               onChange={handleImageUpload}
//             />
//           </div>
//           <form onSubmit={handleProfileUpdate}>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md p-2"
//                 value={profileData.username}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, username: e.target.value })
//                 }
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md p-2"
//                 value={profileData.email}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, email: e.target.value })
//                 }
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold"
//             >
//               Save Profile
//             </button>
//           </form>
//           <button
//             onClick={handleLogout}
//             className="mt-4 w-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition py-2 rounded-lg font-semibold"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Orders & Password Section */}
//         <div className="md:col-span-2 space-y-6">
//           {/* Order History */}
//           <div className="bg-white shadow-lg rounded-2xl p-6">
//             <h3 className="text-lg font-bold mb-4">Order History</h3>
//             {orders.length > 0 ? (
//               <ul>
//                 {orders.map((order) => (
//                   <li
//                     key={order.id}
//                     className="p-3 border rounded-lg mb-2 sm:flex justify-between items-center bg-gray-200 grid grid-cols-14"
//                   >
//                     <span>
//                       Order #{order.id} -{" "}
//                       {order.items.reduce(
//                         (sum, item) => sum + item.quantity,
//                         0
//                       )}{" "}
//                       items
//                     </span>
//                     <span
//                       className={`font-bold ${
//                         order.status === "Completed"
//                           ? "text-green-500"
//                           : "text-yellow-500"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                     <span className="font-medium">
//                       ${order.total_price.toFixed(2)}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No orders yet</p>
//             )}
//           </div>

//           {/* Change Password */}
//           <div className="bg-white shadow-lg rounded-2xl p-6">
//             <h3 className="text-lg font-bold mb-4">Change Password</h3>
//             <form onSubmit={handlePasswordChange}>
//               {/* Current Password */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium  text-gray-700">
//                   Current Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showCurrentPassword ? "text" : "password"}
//                     className="border p-2 w-full rounded-lg bg-gray-100"
//                     value={password.current}
//                     onChange={(e) =>
//                       setPassword({ ...password, current: e.target.value })
//                     }
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                     className="absolute right-2 top-2 text-sm text-gray-600"
//                   >
//                     {showCurrentPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               {/* New Password */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium  text-gray-700">
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     className="border p-2 w-full rounded-lg bg-gray-100"
//                     value={password.new}
//                     onChange={(e) =>
//                       setPassword({ ...password, new: e.target.value })
//                     }
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-2 top-2 text-sm text-gray-600"
//                   >
//                     {showNewPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium  text-gray-700">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     className="border p-2 w-full rounded-lg bg-gray-100"
//                     value={password.confirm}
//                     onChange={(e) =>
//                       setPassword({ ...password, confirm: e.target.value })
//                     }
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-2 top-2 text-sm text-gray-600"
//                   >
//                     {showConfirmPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold"
//               >
//                 Change Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Favorites Dropdown Section at the Bottom */}
//       <div className="bg-white shadow-lg rounded-2xl p-6">
//         <div
//           className="flex justify-between items-center cursor-pointer"
//           onClick={() => setShowFavorites(!showFavorites)}
//         >
//           <span className="text-lg font-semibold">Favorite Products</span>
//           <button className="bg-[#d66161] text-white px-4 py-2 rounded-lg">
//             {showFavorites ? "Hide" : "Show"}
//           </button>
//         </div>

//         {/* Favorite Products List */}
//         {showFavorites && (
//           <div className="mt-4 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar-container">
//             {favoriteProducts.length > 0 ? (
//               favoriteProducts.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-center space-x-4 bg-[#fff4f3] p-4 rounded-lg sm:h-[200px]"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-44 h-44 object-contain rounded-3xl"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-medium text-gray-800">{item.title}</h3>
//                     <span className="font-medium">${item.price}</span>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No favorite products yet</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Error and Success Messages */}
//       {error && (
//         <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
//       )}
//       {success && (
//         <div className="p-4 bg-green-100 text-green-700 rounded-lg">
//           {success}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
// function updateUser(arg0: { image: string; id?: string | undefined; username?: string | undefined; email?: string | undefined; role?: "admin" | "user" | "guest" | undefined; }) {
//   throw new Error("Function not implemented.");
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../Shared/hooks/AuthContext";

interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  created_at: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
}

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    image: "",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username,
        email: user.email,
        image: user.image || "",
      });
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFavoriteProducts(response.data.favorites);
      setOrders(response.data.orders);
    } catch (err) {
      setError("Failed to fetch profile data");
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post("http://127.0.0.1:5000/profile/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setProfileData(prev => ({
          ...prev,
          image: response.data.image_url,
        }));

        if (user) {
          updateUser({ ...user, image: response.data.image_url });
        }

        setSuccess("Profile image updated successfully");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to upload image");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("http://127.0.0.1:5000/profile/update", profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (user) {
        updateUser({
          ...user,
          username: profileData.username,
          email: profileData.email
        });
      }
      
      setSuccess("Profile updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.put(
        "http://127.0.0.1:5000/profile/password",
        {
          current_password: password.current,
          new_password: password.new,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Password changed successfully");
      setPassword({ current: "", new: "", confirm: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to change password");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Main Grid: Profile Card, Orders, and Password */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-gray-300">
              {profileData.image ? (
                <img
                  src={profileData.image}
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
              accept="image/*"
              className="mt-3 block mx-auto"
              onChange={handleImageUpload}
            />
          </div>
          <form onSubmit={handleProfileUpdate}>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md p-2"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-full border bg-gray-100 border-gray-300 rounded-md p-2"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold"
            >
              Save Profile
            </button>
          </form>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-gray-200 text-gray-800 hover:bg-gray-300 transition py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Orders & Password Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Order History */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Order History</h3>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="p-3 border rounded-lg mb-2 sm:flex justify-between items-center bg-gray-200 grid grid-cols-14"
                  >
                    <span>
                      Order #{order.id} -{" "}
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}{" "}
                      items
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
                    <span className="font-medium">
                      ${order.total_price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet</p>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              {/* Current Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium  text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="border p-2 w-full rounded-lg bg-gray-100"
                    value={password.current}
                    onChange={(e) =>
                      setPassword({ ...password, current: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2 top-2 text-sm text-gray-600"
                  >
                    {showCurrentPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium  text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="border p-2 w-full rounded-lg bg-gray-100"
                    value={password.new}
                    onChange={(e) =>
                      setPassword({ ...password, new: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2 top-2 text-sm text-gray-600"
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-sm font-medium  text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="border p-2 w-full rounded-lg bg-gray-100"
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2 text-sm text-gray-600"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 w-full bg-[#d66161] text-white hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition py-2 rounded-lg font-semibold"
              >
                Change Password
              </button>
            </form>
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
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((item) => (
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
                    <span className="font-medium">${item.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No favorite products yet</p>
            )}
          </div>
        )}
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
      )}
      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}
    </div>
  );
};

export default Profile;