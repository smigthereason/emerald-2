// FavouritesPage.tsx
import React from "react";
import { useFavourites } from "../components/FavouritesContext";

const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <div className="py-8 px-4">
      <h2 className="text-center text-2xl font-light mb-4">
        <span className="text-black font-bold">favourite </span>Products
      </h2>
      <div className="flex justify-center mb-6">
        <div className="border-b-2 border-black w-16"></div>
      </div>
      {favourites.length === 0 ? (
        <p>No favourite products yet.</p>
      ) : (
        <ul className="space-y-2">
          {favourites.map((id) => (
            <li key={id} className="text-lg">
              {id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;
