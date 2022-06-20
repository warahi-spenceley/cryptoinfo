import React, { createContext } from 'react';

export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const [watchList, setWatchlist] = React.useState([]);

  return (
    <WatchlistContext.Provider 
      value={{
        watchList,
        setWatchlist,
      }}
    >
      { children }
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;