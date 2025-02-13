// FavouritesPage.tsx
import React from "react";
import { useFavourites } from "../../../Shared/hooks/FavouritesContext";
import ProductCard from "../components/ProductCard";
import { products } from "../../../data/products"; 
import Title from "../components/Title";


const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();
  const favouriteProducts = products.filter((product) =>
    favourites.includes(product.id)
  );

  return (
    <div id="fav" className="py-8 px-4">
      <Title highlightText="favourite" mainText="Products" />
      {favouriteProducts.length === 0 ? (
        <p>No favourite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesPage;