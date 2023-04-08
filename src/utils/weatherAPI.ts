// weatherAPI.ts
const API_KEY = "ec82da4207a945bfa0070148230404";

export async function getWeatherDataByCoordinates(
  latitude: number,
  longitude: number
): Promise<Object> {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5&aqi=yes&alerts=yes`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getWeatherDataByCity(city: string): Promise<Object> {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=yes&aqi=yes`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
