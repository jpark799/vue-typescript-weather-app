import {ref} from 'vue'
import type { WeatherData } from '../models'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const useWeather = () => {
    const weather = ref<WeatherData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchWeather(city: string) {
        loading.value = true
        error.value = null

        try {
            const res = await fetch(
                `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
            )

            if (!res.ok) {
                throw new Error(city + ' not found')
            }

            const data = await res.json()

            weather.value = {
                city: data.name,
                country: data.sys.country,
                temp: Math.round(data.main.temp),
                feels_like: Math.round(data.main.feels_like),
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
            }
        }    catch (err: any) {
            error.value = err.message
        }    finally {
            loading.value = false
        }
    }

    return {weather, loading, error, fetchWeather}
}