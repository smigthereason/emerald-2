// import React, { useState, useMemo } from "react";
// import { AnimatePresence } from "framer-motion";
// import ProductCard from "./ProductCard";
// import { products } from "../../../data/products"; 
// import Title from "./Title";

// const Products: React.FC = () => {
//   const [visibleCount, setVisibleCount] = useState<number>(6);

//   // Create a memoized shuffled copy so it doesn't change on every render.
//   const shuffledProducts = useMemo(() => {
//     return [...products].sort(() => Math.random() - 0.5);
//   }, []);

//   const visibleProducts = shuffledProducts.slice(0, visibleCount);

//   const loadMoreProducts = () => {
//     setVisibleCount(prevCount => prevCount + 6);
//   };

//   const seeLessProducts = () => {
//     setVisibleCount(prevCount => Math.max(prevCount - 6, 6));
//     window.scrollTo({
//       top: 650,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="py-8">
//       <Title highlightText="featured" mainText="items" />
//       <div className="grid grid-row-1 gap-8 mt-8 sm:grid-cols-3">
//         <AnimatePresence>
//           {visibleProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </AnimatePresence>
//       </div>
//       {visibleCount < shuffledProducts.length && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={loadMoreProducts}
//             className="bg-white transition-transform duration-300 hover:-translate-y-1  text-[#d66161] px-6 py-2 rounded-full hover:bg-[#d66161] hover:text-white border border-[#d66161]"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//       {visibleCount > 6 && (
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={seeLessProducts}
//             className="bg-white transition-transform duration-300 hover:-translate-y-1  text-[#d66161] px-6 py-2 rounded-full hover:bg-[#d66161] hover:text-white border border-[#d66161]"
//           >
//             See Less
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;
