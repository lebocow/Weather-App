import { createContext, ReactNode, useState } from "react";
import { FC } from "react";

export type FavoriteItem = {
  city: string;
};

type FavoriteContextProps = {
  favorites: FavoriteItem[];
  addFavorite: (city: string) => void;
  removeFavorite: (index: number) => void;
};

export const FavoriteContext = createContext<FavoriteContextProps>({
  favorites: [],
  addFavorite: () => null,
  removeFavorite: () => null,
});

type FavoriteProviderProps = {
  children: ReactNode;
};

export const FavoriteProvider: FC<FavoriteProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (city: string) => {
    const cityExists = favorites.some(
      (favorite) => favorite.city.toLowerCase() === city.toLowerCase()
    );

    if (!cityExists) {
      const newFavorite: FavoriteItem = {
        city: city,
      };

      setFavorites([...favorites, newFavorite]);
    } else {
      console.log("City already exists in favorites");
    }
  };

  const removeFavorite = (index: number) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const value = { favorites, addFavorite, removeFavorite };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
