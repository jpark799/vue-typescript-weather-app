<script setup lang="ts">
import type { WeatherData } from "../models";

defineProps<{
  weather: WeatherData;
}>();
</script>

<template>
  <div
    class="w-full max-w-md mx-auto mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-gray-800 dark:text-white"
  >
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">
          {{ weather.city }}, {{ weather.country }}
        </h2>
        <p class="capitalize text-gray-500 dark:text-gray-400">
          {{ weather.description }}
        </p>
      </div>
      <img :src="weather.icon" :alt="weather.description" class="w-16 h-16" />
    </div>

    <div class="mt-4">
      <p class="text-6xl font-thin">{{ weather.temp }}°C</p>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Feels like {{ weather.feels_like }}°C
      </p>
    </div>

    <div class="flex gap-6 mt-6 text-sm text-gray-600 dark:text-gray-300">
      <div>
        <p class="font-semibold">Humidity</p>
        <p>{{ weather.humidity }}%</p>
      </div>
      <div>
        <p class="font-semibold">Wind</p>
        <p>{{ weather.wind_speed }} m/s</p>
      </div>
    </div>
  </div>
</template>
