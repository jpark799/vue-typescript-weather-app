<script setup lang="tsx">
import type { ForecastDay } from "../models";

defineProps<{
  forecast: ForecastDay[];
}>();
</script>

<template>
  <div class="w-full max-w-md mx-auto mt-4 grid grid-cols-5 gap-2">
    <div
      v-for="day in forecast"
      :key="day.date"
      class="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow text-gray-800 dark:text-white"
    >
      <p class="text-xs font-semibold text-gray-500 dark:text-gray-400">
        {{ day.date }}
      </p>
      <img :src="day.icon" :alt="day.description" class="w-10 h-10 mx-auto" />
      <p class="text-lg font-bold">{{ day.temp }}°C</p>
      <p class="text-xs capitalize text-gray-500 dark:text-gray-400">
        {{ day.description }}
      </p>
    </div>
  </div>
</template>
