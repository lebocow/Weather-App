import { FormEvent, useContext, useEffect, useState } from "react";

import SearchBar from "./components/search-bar/search-bar.component";
import CurrentWeather from "./components/current-weather/current-weather.compontent";
import Forecast from "./components/forecast/forecast.component";
import ThemeToggleButton from "./components/theme-toggle-button/theme-toggle-button.component";
import FavoritesToggleButton from "./components/favorites-toggle-button/favorites-toggle-button.component";
import HourlyForecast from "./components/hourly-forecast/hourly-forecast.component";
import FavoritesDropdown from "./components/favorites-dropdown/favorites-dropdown.component";

import {
  getWeatherDataByCoordinates,
  getWeatherDataByCity,
  WeatherAPIResponse,
} from "../src/utils/weatherAPI";

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

import { ThemeContext } from "./contexts/theme.context";
import { FavoriteContext } from "./contexts/favorite.context";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherAPIResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { darkMode } = useContext(ThemeContext);
  const { favorites, removeFavorite, addFavorite } =
    useContext(FavoriteContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const isCityInFavorites = (city: string) => {
    return favorites.some(
      (favorite) => favorite.city.toLowerCase() === city.toLowerCase()
    );
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleRemoveFavorite = (index: number) => {
    removeFavorite(index);
    toggleDropdown();
  };

  const handleAddFavorite = (city: string) => {
    addFavorite(city);
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    fetchWeatherData(() => getWeatherDataByCity(search));
    setSearch("");
  };

  const iconHandler = async () => {
    if (!search) return;
    const data = await getWeatherDataByCity(search);
    setWeatherData(data);
  };

  function getUserGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const fetchWeatherData = async (
    fetchFunction: () => Promise<WeatherAPIResponse | null>
  ) => {
    setIsLoading(true);
    setErrorMessage(null);
    const data = await fetchFunction();
    if (data) {
      setWeatherData(data);
    } else {
      setErrorMessage("Failed to fetch weather data. Please try again.");
      setWeatherData(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    (async function () {
      const position = await getUserGeolocation();
      const { latitude, longitude } = position.coords;
      fetchWeatherData(() => getWeatherDataByCoordinates(latitude, longitude));
    })();
  }, []);

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-slate-100"
      } `}
    >
      <div
        className={`relative flex w-10/12 flex-col rounded-2xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        } p-6 shadow-2xl md:p-16`}
      >
        <div className="absolute right-4 top-4 flex items-center justify-center space-x-3 focus:outline-none md:right-6 md:top-6 ">
          {weatherData && isCityInFavorites(weatherData.location.name) ? (
            <MdFavorite className="h-6 w-6" />
          ) : (
            <MdFavoriteBorder
              onClick={() =>
                weatherData && handleAddFavorite(weatherData.location.name)
              }
              className="h-6 w-6"
            />
          )}
          <ThemeToggleButton />
        </div>

        <FavoritesToggleButton toggleDropdown={toggleDropdown} />

        <FavoritesDropdown
          isDropdownVisible={isDropdownVisible}
          favorites={favorites}
          handleRemoveFavorite={handleRemoveFavorite}
          getWeatherDataByCity={getWeatherDataByCity}
          setWeatherData={setWeatherData}
        />

        <h1 className="mb-6 text-center font-bold md:text-3xl">Weather App</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          formHandler={formHandler}
          iconHandler={iconHandler}
        />

        {isLoading ? (
          <div className="flex items-center justify-center">
            <ImSpinner2 className="h-10 w-10 animate-spin" />
          </div>
        ) : errorMessage ? (
          <div className="text-center text-red-500">{errorMessage}</div>
        ) : weatherData ? (
          <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 md:space-y-0">
            <CurrentWeather weatherData={weatherData} darkMode={darkMode} />
            <HourlyForecast weatherData={weatherData} darkMode={darkMode} />
            <Forecast forecast={weatherData.forecast} darkMode={darkMode} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
