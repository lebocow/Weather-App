import React from "react";

interface CurrentWeatherProps {
  weatherData: any;
  darkMode: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  darkMode,
}) => {
  return (
    <div
      className={`flex flex-col rounded-lg p-3  md:w-1/2 ${
        darkMode ? "bg-gray-700" : "bg-slate-100"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl ">{weatherData.current.temp_c}°</h1>
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
        />
      </div>

      <h2 className="text-xl font-semibold ">
        {weatherData.location.name}, {weatherData.location.country}
      </h2>
    </div>
  );
};

export default CurrentWeather;
