import { ref } from "vue";
import type {
  ForecastAPIResponse,
  ForecastDay,
  WeatherAPIResponse,
  WeatherData,
} from "../models";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  const weather = ref<WeatherData | null>(null);
  const forecast = ref<ForecastDay[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchWeather(city: string) {
    loading.value = true;
    error.value = null;

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`),
      ]);

      if (!weatherRes.ok) throw new Error(city + " not found");

      const weatherData = (await weatherRes.json()) as WeatherAPIResponse;
      const forecastData = (await forecastRes.json()) as ForecastAPIResponse;

      if (!weatherData.weather[0]) throw new Error("Invalid weather data");

      weather.value = {
        city: weatherData.name,
        country: weatherData.sys.country,
        temp: Math.round(weatherData.main.temp),
        feels_like: Math.round(weatherData.main.feels_like),
        description: weatherData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        humidity: weatherData.main.humidity,
        wind_speed: weatherData.wind.speed,
      };

      const seen = new Set<string>();
      forecast.value = forecastData.list
        .filter((item) => {
          const date = item.dt_txt.split(" ")[0] ?? "";
          if (seen.has(date)) return false;
          seen.add(date);
          return true;
        })
        .slice(1, 6) // skip today because we are rendering that with weather, take next 5 days
        .map((item) => {
          const currentWeather = item.weather[0];
          if (!currentWeather) throw new Error("Invalid forecast data");
          const { description, icon } = currentWeather;
          return {
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            temp: Math.round(item.main.temp),
            description,
            icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          };
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = "An unexpected error occurred";
      }
    } finally {
      loading.value = false;
    }
  }

  return { weather, loading, error, forecast, fetchWeather };
};
