import { iBeerData } from "../interfaces/DataInterfaces";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the context type
interface BeerContextType {
  beers: iBeerData[];
  favoriteBeers: iBeerData[];
  addToBeerList: (beer: iBeerData) => void;
  addToFavorites: (beer: iBeerData) => void;
  removeFromFavorites: (beerId: iBeerData) => void;
  checkFavourite: (beer: iBeerData) => boolean;

  setLocalStoreFavoriteBeers: () => void;
  removeLocalStoreFavoriteBeers: () => void;
}

const BeerContext = createContext<BeerContextType | undefined>(undefined);

// Custom hook for accessing the context
export const useBeerContext = () => {
  const context = useContext(BeerContext);
  if (!context) {
    throw new Error("useBeerContext must be used within a BeerProvider");
  }
  return context;
};

interface BeerProviderProps {
  clientBeerData: iBeerData[];
  children: ReactNode;
}

export const BeerProvider: React.FC<BeerProviderProps> = ({
  children,
  clientBeerData,
}) => {
  const [beers, setBeers] = useState<iBeerData[]>(clientBeerData);
  const [favoriteBeers, setFavoriteBeers] = useState<iBeerData[]>([]);

  const addToBeerList = (beer: iBeerData) => {
    if (!beers.find((b) => b.id === beer.id)) {
      setBeers([...beers, beer]);
    }
  };

  const addToFavorites = (beer: iBeerData) => {
    if (!favoriteBeers.find((b) => b.id === beer.id)) {
      setFavoriteBeers([...favoriteBeers, beer]);
    }
  };

  const removeFromFavorites = (beer: iBeerData) => {
    setFavoriteBeers(favoriteBeers.filter((b) => b.id !== beer.id));
  };

  const checkFavourite = (beer: iBeerData) => {
    if (!favoriteBeers.find((b) => b.id === beer.id)) {
      return false;
    } else {
      return true;
    }
  };
  const setLocalStoreFavoriteBeers = () => {
    localStorage.setItem("favoriteBeers", JSON.stringify(favoriteBeers));
  };
  const getLocalStoreFavoriteBeers = () => {
    const storedFavoriteBeers = localStorage.getItem("favoriteBeers");
    if (storedFavoriteBeers) {
      setFavoriteBeers(JSON.parse(storedFavoriteBeers));
    }
  };
  const removeLocalStoreFavoriteBeers = () => {
    localStorage.setItem("favoriteBeers", JSON.stringify([]));
    setFavoriteBeers([]);
  };



  const contextValue: BeerContextType = {
    beers,
    favoriteBeers,
    addToBeerList,
    addToFavorites,
    removeFromFavorites,
    checkFavourite,
    setLocalStoreFavoriteBeers,
    removeLocalStoreFavoriteBeers,
  };

  useEffect(() => {
    getLocalStoreFavoriteBeers();
  }, []);

  //                    hmmm ....
  // useEffect(() => {
  //   setLocalStoreFavoriteBeers();
  // }, [favoriteBeers]);

  useEffect(() => {
    setBeers(clientBeerData || []);
  }, [clientBeerData]);

  return (
    <BeerContext.Provider value={contextValue}>{children}</BeerContext.Provider>
  );
};
