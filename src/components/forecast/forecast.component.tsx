import React from "react";
import { IoMdWater } from "react-icons/io";
import { Forecast } from "../../utils/weatherAPI";

type ForecastProps = {
  forecast: Forecast;
  darkMode: boolean;
};

const Forecast: React.FC<ForecastProps> = ({ forecast, darkMode }) => {
  return (
    <div className="col-start-2 row-start-1 flex flex-col space-y-2 overflow-y-auto md:mt-0 ">
      {forecast.forecastday.map((day) => (
        <div
          key={day.date}
          className={`grid grid-cols-5 items-center justify-items-center rounded-md p-1 text-xs sm:text-sm md:text-base ${
            darkMode ? "bg-gray-700 text-white " : "bg-slate-100 text-black"
          } `}
        >
          <span className="justify-self-start">
            {new Date(day.date)
              .toLocaleDateString("en-US", {
                weekday: "long",
              })
              .slice(0, 3)}
          </span>
          <div className="flex items-center space-x-1">
            <IoMdWater className="fill-blue-300" />
            <span>{day.day.avghumidity}%</span>
          </div>

          <img
            className="h-5 w-5"
            src={day.day.condition.icon}
            alt={day.day.condition.text}
          />
          <span className="">{day.day.maxtemp_c} °C</span>
          <span className="">{day.day.mintemp_c} °C</span>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
