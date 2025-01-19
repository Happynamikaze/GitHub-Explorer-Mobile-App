import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (repo) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === repo.id)) {
        const updatedFavorites = [...prevFavorites, repo];
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (repoId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== repoId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
