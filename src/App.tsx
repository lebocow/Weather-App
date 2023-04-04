import { ChangeEvent, FormEvent, useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await getCityData(search);
    setWeatherData(data);
    console.log(data);
  };

  function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function getCurrentCityData(): Promise<Object> {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=ec82da4207a945bfa0070148230404&q=${latitude},${longitude}&days=5&aqi=yes&alerts=yes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async function getCityData(city: string): Promise<Object> {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=ec82da4207a945bfa0070148230404&q=${city}&days=5&aqi=yes&alerts=yes&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    (async function () {
      const cityData = await getCurrentCityData();
      setWeatherData(cityData);
      console.log(cityData);
    })();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 transition-all">
      <div className="flex w-10/12 flex-col rounded-2xl bg-white p-6 shadow-2xl md:p-16">
        <h1 className="mb-6 text-center text-3xl font-bold">Weather App</h1>
        <form onSubmit={formHandler} className="mb-6">
          <input
            onChange={searchHandler}
            className="w-full rounded-md bg-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            value={search}
            placeholder="Search city..."
          />
          <button
            className="mt-4 rounded-md bg-indigo-500 px-6 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="submit"
          >
            Search
          </button>
        </form>
        {weatherData && (
          <div className="flex w-full flex-col">
            <h2 className="mb-4 text-xl font-semibold">
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <div className="flex w-full justify-start space-x-2 overflow-x-auto">
              {weatherData.forecast.forecastday.map((day: any) => (
                <div
                  key={day.date}
                  className="flex flex-col items-center rounded-md bg-slate-100 p-4"
                >
                  <span className="mb-2">
                    {new Date(day.date).toLocaleDateString()}
                  </span>
                  <img
                    className="mb-2"
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                  />
                  <span className="font-semibold">{day.day.avgtemp_c} °C</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
