import React, { FC } from "react";
import { MdOutlineClose } from "react-icons/md";
import { FavoriteItem } from "../../contexts/favorite.context";
import { WeatherAPIResponse } from "../../utils/weatherAPI";

type FavoritesDropdownProps = {
  isDropdownVisible: boolean;
  favorites: FavoriteItem[];
  handleRemoveFavorite: (index: number) => void;
  getWeatherDataByCity: (city: string) => Promise<WeatherAPIResponse | null>;
  setWeatherData: (data: WeatherAPIResponse | null) => void;
};

const FavoritesDropdown: FC<FavoritesDropdownProps> = ({
  isDropdownVisible,
  favorites,
  handleRemoveFavorite,
  getWeatherDataByCity,
  setWeatherData,
}) => {
  return isDropdownVisible ? (
    <div className="absolute left-6 top-12 z-10 mt-2 w-32 rounded-md border border-gray-300 bg-white text-black shadow-md">
      {favorites.length !== 0 ? (
        favorites.map((favorite, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 hover:bg-gray-200"
            onClick={async () => {
              const data = await getWeatherDataByCity(favorite.city);
              setWeatherData(data);
            }}
          >
            <div>{favorite.city}</div>
            <MdOutlineClose
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(index);
              }}
            />
          </div>
        ))
      ) : (
        <div className="text-center">No favorites</div>
      )}
    </div>
  ) : null;
};

export default FavoritesDropdown;
