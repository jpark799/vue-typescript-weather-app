<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import WeatherCard from "./components/WeatherCard.vue";
import ForecastCard from "./components/ForecastCard.vue";
import { useWeather } from "./composables/useWeather";

const { weather, forecast, loading, error, fetchWeather } = useWeather();
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
  >
    <h1
      class="text-3xl font-bold text-center text-gray-800 dark:text-white pt-10"
    >
      Vue Weather
    </h1>
    <SearchBar @search="fetchWeather" />

    <p v-if="loading" class="text-center text-gray-500 dark:text-gray-400 mt-6">
      Loading...
    </p>

    <p v-else-if="error" class="text-center text-red-400 mt-6">
      {{ error }}
    </p>

    <template v-else-if="weather">
      <WeatherCard :weather="weather" />
      <ForecastCard v-if="forecast.length" :forecast="forecast" />
    </template>
  </div>
</template>
