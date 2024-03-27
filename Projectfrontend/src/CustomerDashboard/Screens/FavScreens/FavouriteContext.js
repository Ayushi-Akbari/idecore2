// FavoritesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from local storage to maintain state across sessions
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  });
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favoriteId => favoriteId !== id));
};

  useEffect(() => {
    // Update local storage when favorites change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(productId);
      if (isFavorite) {
        // Remove from favorites
        return prevFavorites.filter(id => id !== productId);
      } else {
        // Add to favorites
        return [...prevFavorites, productId];
      }
    });
  };

  const value = { favorites, toggleFavorite,removeFavorite};

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
