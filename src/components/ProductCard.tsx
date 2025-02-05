// // ProductCard.tsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { IoEyeSharp } from "react-icons/io5";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
// import { useFavourites } from "./FavouritesContext";
// import { motion } from "framer-motion";

// interface Product {
//   id: string;
//   title: string;
//   brief: string;
//   price: string;
//   image: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { favourites, toggleFavourite } = useFavourites();

//   return (
//     <motion.div
//       className="bg-white overflow-hidden border h-[650px] sm:h-auto rounded-lg shadow-lg"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="relative group top-0 ">
//         <img
//           className=" w-56 sm:w-full h-[400px] object-contain mx-auto mt-2 sm:mt-8  rounded-lg"
//           src={product.image}
//           alt={product.title}
//         />
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="flex space-x-4">
//             <Link to={`/${product.id}`}>
//               <IoEyeSharp className="text-white text-4xl" />
//             </Link>
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 toggleFavourite(product.id);
//               }}
//             >
//               {favourites.includes(product.id) ? (
//                 <MdFavorite className="text-red-500 text-3xl" />
//               ) : (
//                 <MdFavoriteBorder className="text-white text-3xl" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="p-2 sm:p-4 relative bottom-4 sm:bottom-0">
//         <h3 className="text-lg sm:text-xl font-bold mb-2">{product.title}</h3>
//         <p className="text-sm text-gray-500 mb-4">{product.brief}</p>
//         <div className="flex flex-col justify-between items-center space-y-4">
//           <span className="text-lg sm:text-2xl font-bold">{product.price}</span>
//           <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-16">
//             <Link
//               to={`/${product.id}`}
//               className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
//             >
//               Add to Cart
//             </Link>
//             <Link
//               to={`/${product.id}`}
//               className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
//             >
//               Buy
//             </Link>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;
import React from "react";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavourites } from "./FavouritesContext";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  brief: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favourites, toggleFavourite } = useFavourites();

  return (
    <motion.div
      className="bg-white overflow-hidden border h-[650px] sm:h-auto rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Product Image with Hover Actions */}
      <div className="relative group top-0">
        <img
          className="w-56 sm:w-full h-[350px] sm:h-[400px] object-contain mx-auto mt-2 sm:mt-8 rounded-lg"
          src={product.image}
          alt={product.title}
        />

        {/* Hover Icons for Large Screens */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4">
            <Link to={`/${product.id}`}>
              <IoEyeSharp className="text-white text-4xl" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavourite(product.id);
              }}
            >
              {favourites.includes(product.id) ? (
                <MdFavorite className="text-red-500 text-3xl" />
              ) : (
                <MdFavoriteBorder className="text-white text-3xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Always Visible Icons Below Image for Small Screens */}
      <div className="relative flex -top-8 sm:hidden justify-center space-x-6 m-4 p-2">
        <Link to={`/${product.id}`}>
          <IoEyeSharp className="text-black text-3xl" />
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavourite(product.id);
          }}
        >
          {favourites.includes(product.id) ? (
            <MdFavorite className="text-red-500 text-3xl" />
          ) : (
            <MdFavoriteBorder className="text-black text-3xl" />
          )}
        </button>
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-4 relative bottom-12 sm:bottom-0">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{product.brief}</p>
        <div className="flex flex-col justify-between items-center space-y-4">
          <span className="text-lg sm:text-2xl font-bold">{product.price}</span>
          <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-16">
            <Link
              to={`/${product.id}`}
              className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
            >
              Add to Cart
            </Link>
            <Link
              to={`/${product.id}`}
              className="bg-black text-white px-4 py-2 rounded hover:bg-[#ff5630]"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
