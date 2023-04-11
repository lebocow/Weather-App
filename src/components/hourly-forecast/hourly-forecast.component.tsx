import { FC } from "react";
import { IoMdWater } from "react-icons/io";
import { WeatherAPIResponse } from "../../utils/weatherAPI";

type HourlyForecastProps = {
  weatherData: WeatherAPIResponse;
  darkMode: boolean;
};

const HourlyForecast: FC<HourlyForecastProps> = ({ weatherData, darkMode }) => {
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <div className="col-span-2 flex space-x-2 overflow-x-auto text-xs sm:text-sm md:text-base">
      {weatherData.forecast.forecastday[0].hour.map((hourData, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-between space-y-1 rounded-lg p-3 ${
            darkMode ? "bg-gray-700 text-white " : "bg-slate-100 text-black"
          }`}
        >
          <div>{formatTime(hourData.time)}</div>
          <img className="h-5 w-5" src={hourData.condition.icon} />
          <div>{hourData.temp_c} °C</div>
          <div className="flex items-center space-x-1">
            <IoMdWater className="fill-blue-300" />
            <span>{hourData.humidity}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;
