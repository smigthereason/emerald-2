// import axios from 'axios';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/AuthContext';

// const StartSellingButton: React.FC = () => {
//     const { user, checkAuth } = useAuth();
//     const navigate = useNavigate();

//     const handleStartSelling = async () => {
//         if (!user) {
//             // If not logged in, redirect to login page
//             navigate('/login?redirect=become-seller');
//             return;
//         }

//         try {
//             // Request to upgrade user to seller/admin
//             const response = await axios.post(
//                 'http://127.0.0.1:5000/upgrade-to-admin',
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 // Refresh auth state to get updated user role
//                 await checkAuth();
//                 alert('Congratulations! You are now a seller.');
//                 navigate('/admin/dashboard');
//             }
//         } catch (error) {
//             console.error('Error upgrading account:', error);
//             alert('Failed to upgrade your account. Please try again later.');
//         }
//     };

//     // Don't show button if user is already an admin
//     if (user?.is_admin) {
//         return (
//             <button
//                 onClick={() => navigate('/admin/dashboard')}
//                 className="px-4 py-2 bg-[#d66161] text-white rounded-md hover:bg-[#c55151] transition-colors"
//             >
//                 Go to Seller Dashboard
//             </button>
//         );
//     }

//     return (
//         <button
//             onClick={handleStartSelling}
//             className="px-4 py-2 bg-[#d66161] text-white rounded-md hover:bg-[#c55151] transition-colors"
//         >
//             Start Selling
//         </button>
//     );
// };

// export default StartSellingButton;

// StartSellingButton.tsx
import React from "react";
import axios from "axios";
import { useAuth } from "../../Shared/hooks/AuthContext";

const StartSellingButton: React.FC = () => {
  const { user } = useAuth();

  const handleStartSelling = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/profile/become-seller",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("You are now a seller!");
        window.location.reload(); // Refresh to update the UI
      }
    } catch (error) {
      console.error("Error becoming a seller:", error);
      alert("Failed to become a seller");
    }
  };

  return (
    <button
      onClick={handleStartSelling}
      className="bg-[#d66161] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#d66161] hover:border hover:border-[#d66161] transition"
    >
      Start Selling
    </button>
  );
};

export default StartSellingButton;
