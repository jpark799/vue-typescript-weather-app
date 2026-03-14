<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";

function handleSearch(city: string) {
  console.log("Searching for:", city);
}
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
    <SearchBar @search="handleSearch" />
  </div>
</template>
