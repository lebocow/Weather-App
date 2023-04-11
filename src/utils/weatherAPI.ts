// weatherAPI.ts
const API_KEY = "ec82da4207a945bfa0070148230404";

export type WeatherAPIResponse = {
  location: Location;
  current: Current;
  forecast: Forecast;
};

export type Location = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

export type Current = {
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type Forecast = {
  forecastday: ForecastDay[];
};

export type ForecastDay = {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
};

export type Day = {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: string;
  daily_will_it_snow: number;
  daily_chance_of_snow: string;
  condition: Condition;
  uv: number;
};

export type Astro = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
};

export type Hour = {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: string;
  will_it_snow: number;
  chance_of_snow: string;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
};

export async function getWeatherDataByCoordinates(
  latitude: number,
  longitude: number
): Promise<WeatherAPIResponse | null> {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5&aqi=yes&alerts=yes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      console.error(data.error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    return null;
  }
}

export async function getWeatherDataByCity(
  city: string
): Promise<WeatherAPIResponse | null> {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=yes&alerts=yes&aqi=yes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.error) {
      console.error(data.error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error fetching weather data by city:", error);
    return null;
  }
}
