import React, { createContext } from 'react';

export const FavouritesContext = createContext();

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = React.useState([]);

  return (
    <FavouritesContext.Provider 
      value={{
        favourites,
        setFavourites,
      }}
    >
      { children }
    </FavouritesContext.Provider>
  );
};

export default FavouritesProvider;