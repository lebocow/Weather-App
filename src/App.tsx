import { FormEvent, useEffect, useState } from "react";
import SearchBar from "./components/search-bar/search-bar.component";
import CurrentWeather from "./components/current-weather/current-weather.compontent";
import Forecast from "./components/forecast/forecast.component";
import {
  getWeatherDataByCoordinates,
  getWeatherDataByCity,
} from "../src/utils/weatherAPI";

import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    const data = await getWeatherDataByCity(search);
    setWeatherData(data);
    console.log(data);
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

  async function fetchWeatherData() {
    const position = await getUserGeolocation();
    const { latitude, longitude } = position.coords;
    const data = await getWeatherDataByCoordinates(latitude, longitude);
    return data;
  }

  useEffect(() => {
    (async function () {
      const cityData = await fetchWeatherData();
      setWeatherData(cityData);
      console.log(cityData);
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
        <button
          className="absolute right-4 top-4 focus:outline-none md:right-6 md:top-6"
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <h1 className="mb-6 text-center text-3xl font-bold">Weather App</h1>
        <SearchBar
          search={search}
          setSearch={setSearch}
          formHandler={formHandler}
          iconHandler={iconHandler}
        />
        {weatherData && (
          <div className="flex flex-col md:flex-row md:gap-4 ">
            <CurrentWeather weatherData={weatherData} darkMode={darkMode} />
            <Forecast forecast={weatherData.forecast} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
